import { useState, useEffect } from "react";

interface PriceProps {
  period: string;
  lastPrice: number | null; // Accept lastPrice as a prop
}

const Price: React.FC<PriceProps> = ({ period, lastPrice }) => {
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [priceChangePercentage, setPriceChangePercentage] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      if (lastPrice === null) return; // Ensure lastPrice is available

      try {
        const coinPriceApiKey = import.meta.env.VITE_COINGECKO_API_KEY;
        const coinPriceUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${period}&x_cg_demo_api_key=${coinPriceApiKey}`;
        const response = await fetch(coinPriceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const periodStartPrice = data.prices[0][1];

        setPriceChange(lastPrice - periodStartPrice);
        setPriceChangePercentage(
          ((lastPrice - periodStartPrice) / periodStartPrice) * 100
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [period, lastPrice]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <section className="relative h-[122px] w-[326px]">
      <div>
        {/* NUMBER AND USD */}
        <div className="flex">
          {/* NUMBER */}
          <div className="absolute top-[60px] left-[60px]">
            <h1 className="text-[#1A243A] text-[70px] dark:text-gray-200 font-circular leading-[88.56px]">
              {lastPrice ? formatPrice(lastPrice) : "Loading..."}{" "}
              {/* Use lastPrice here */}
            </h1>
          </div>
          {/* USD */}
          <div className="absolute top-[77px] left-[380px]">
            <h3 className="font-circular text-[#BDBEBF] text-[24px] leading-[30.36px]">
              USD
            </h3>
          </div>
        </div>

        {/* PRICE CHANGE */}
        <div className="absolute top-[159px] left-[60px]">
          {/* PRICE CHANGE VALUE*/}
          <div
            className={`font-circular text-[18px] leading-[22.77px] ${
              priceChange && priceChange >= 0
                ? "text-[#67BF6B]"
                : "text-red-500"
            }`}
          >
            {priceChange && priceChangePercentage
              ? `${priceChange >= 0 ? "+" : "-"} ${formatPrice(
                  Math.abs(priceChange)
                )} (${priceChangePercentage.toFixed(2)}%)`
              : "Loading..."}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Price;
