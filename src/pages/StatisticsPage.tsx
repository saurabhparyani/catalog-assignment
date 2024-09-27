import { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Price from "../components/Price";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "../components/ui/chart";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CoinData {
  symbol: string;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
}

const StatisticsPage = () => {
  const [marketData, setMarketData] = useState<CoinData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_COIN_STATS_URL;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Failed to fetch cryptocurrency data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieChartData = marketData.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    value: coin.market_cap,
    fill: `hsl(var(--chart-${marketData.indexOf(coin) + 1}))`,
  }));

  const chartConfig = {
    marketCap: {
      label: "Market Cap",
    },
    ...marketData.reduce(
      (acc, coin, index) => ({
        ...acc,
        [coin.symbol.toUpperCase()]: {
          label: coin.symbol.toUpperCase(),
          color: `hsl(var(--chart-${index + 1}))`,
        },
      }),
      {}
    ),
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const barChartData = marketData[0]?.sparkline_in_7d.price
    .slice(-7)
    .map((price, index) => ({
      name: daysOfWeek[index],
      BTC: price,
      ETH: marketData[1]?.sparkline_in_7d.price.slice(-7)[index],
      USDT: marketData[2]?.sparkline_in_7d.price.slice(-7)[index],
      BNB: marketData[3]?.sparkline_in_7d.price.slice(-7)[index],
      SOL: marketData[4]?.sparkline_in_7d.price.slice(-7)[index],
    }));

  return (
    <div className="relative">
      <Price />
      <Menu />
      <div className="absolute top-[300px] left-[60px] font-circular leading-[23px] w-full max-w-[1200px] pb-10">
        <h2 className="text-3xl font-bold mb-6">Cryptocurrency Statistics</h2>
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Market Cap Distribution */}
            <Card className="flex flex-col w-full md:w-1/2">
              <CardHeader className="items-center pb-0">
                <CardTitle>Market Cap Distribution</CardTitle>
                <CardDescription>Top 5 Cryptocurrencies</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square w-full max-h-[400px]"
                >
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      label
                    />
                    <Tooltip />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                      className="mt-4 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            {/* 7-Day Price Trend */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">7-Day Price Trend</h3>
              <ChartContainer className="h-[400px]" config={{}}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="BTC" fill="#f7931a" />
                  <Bar dataKey="ETH" fill="#627eea" />
                  <Bar dataKey="USDT" fill="#26a17b" />
                  <Bar dataKey="BNB" fill="#f3ba2f" />
                  <Bar dataKey="SOL" fill="#00ffa3" />
                  <ChartTooltip />
                </BarChart>
              </ChartContainer>
              <p className="text-sm text-gray-500 ml-5">
                All prices are in USD. Data provided by CoinGecko.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
