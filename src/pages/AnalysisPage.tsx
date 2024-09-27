import { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Price from "../components/Price";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const AnalysisPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsUrl = `${import.meta.env.VITE_NEWS_URL}`;
        const response = await fetch(newsUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setNewsItems(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch Bitcoin news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="relative">
      <Price />
      <Menu />
      <div className="absolute top-[300px] left-[60px] right-[60px] pb-10 font-circular leading-[23px]">
        <h2 className="text-3xl font-bold mb-6">Bitcoin News Analysis</h2>
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-6">
            {newsItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{item.description}</p>
                  <div className="text-sm text-gray-500">
                    <span>{item.source.name}</span> •
                    <span className="ml-2">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
