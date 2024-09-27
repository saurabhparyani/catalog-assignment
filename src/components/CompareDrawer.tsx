import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompareDrawer: React.FC<CompareDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (selectedCrypto) {
      fetchCryptoData();
    }
  }, [selectedCrypto]);

  const fetchCryptoData = async () => {
    setIsLoading(true);
    try {
      const coinDrawerUrl = `${import.meta.env.VITE_COIN_DRAWER_URL}`;
      const response = await fetch(coinDrawerUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setComparisonData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setError("Failed to fetch crypto data. Please try again.");
      setComparisonData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const prepareChartData = () => {
    if (!comparisonData) return [];

    return [
      {
        name: "Catalog coin",
        price: 63179.71,
        change: 3.54,
      },
      {
        name: selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1),
        price: comparisonData[selectedCrypto]?.usd || 0,
        change: Number(
          comparisonData[selectedCrypto]?.usd_24h_change || 0
        ).toFixed(2),
      },
    ];
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-1 right-4 text-4xl flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <h2 className="text-2xl items-center flex justify-center font-bold mb-4 font-circular leading-[23px]">
            Compare
          </h2>
          <p className="text-center mb-4 font-circular leading-[23px] text-gray-500">
            Add a cryptocurrency ticker symbol (eg. BTC)
          </p>
          <Select onValueChange={setSelectedCrypto} value={selectedCrypto}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a cryptocurrency" />
            </SelectTrigger>
            <SelectContent className="font-circular leading-[23px]">
              <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
              <SelectItem value="tether">Tether (USDT)</SelectItem>
              <SelectItem value="binancecoin">Binance Coin (BNB)</SelectItem>
              <SelectItem value="solana">Solana (SOL)</SelectItem>
            </SelectContent>
          </Select>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {isLoading ? (
            <div className="flex justify-center items-center mt-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            comparisonData && (
              <Card className="mt-10">
                <CardHeader>
                  <CardTitle className="font-circular leading-[23px]">
                    Cryptocurrency Comparison
                  </CardTitle>
                  <CardDescription className="font-circular leading-[23px]">
                    Comparing Catalog coin with{" "}
                    {selectedCrypto.split("")[0].toUpperCase() +
                      selectedCrypto.slice(1)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center font-circular leading-[23px]">
                    <BarChart
                      width={500}
                      height={300}
                      data={prepareChartData()}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#8884d8"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                      />
                      <Tooltip labelClassName="dark:text-gray-700" />
                      <Bar yAxisId="left" dataKey="price" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="change" fill="#82ca9d" />
                    </BarChart>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start font-circular leading-[23px]">
                  <p className="text-sm text-gray-500">
                    Data sourced from CoinGecko API.
                  </p>
                  <p className="text-sm text-gray-400">All prices in USD.</p>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CompareDrawer;
