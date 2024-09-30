import React, { useState, useEffect, useRef } from "react";
import {
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";
import { useFullscreen } from "../hooks/useFullscreen";
import FullscreenIcon from "../assets/fullscreen.svg";
import VerticalLogo from "../assets/vertical.svg";
import HorizontalLogo from "../assets/horizontal.svg";
import GridLinesLogo from "../assets/grid.svg";
import VolumeLogo from "../assets/volume.svg";

const periods: { [key: string]: number } = {
  "1d": 1,
  "3d": 3,
  "1w": 7,
  "1m": 30,
  "6m": 180,
  "1y": 365,
  max: 365,
};

interface ChartData {
  date: string;
  price: number;
}

const Chart: React.FC<{ period: string }> = ({ period }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [lastPointY, setLastPointY] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [tooltipPrice, setTooltipPrice] = useState<number | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const chartHeight = 300;
      const minPrice = Math.min(...data.map((d) => d.price));
      const maxPrice = Math.max(...data.map((d) => d.price));
      const lastPrice = data[data.length - 1].price;

      // Calculate the Y position (0 is top, chartHeight is bottom)
      const yPosition =
        chartHeight -
        ((lastPrice - minPrice) / (maxPrice - minPrice)) * chartHeight;
      setLastPointY(yPosition);

      // Set initial tooltip price to the last price in the data
      setTooltipPrice(lastPrice);
      // Set initial tooltip position to the last point
      setTooltipPosition({ x: 450, y: 20 });
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinStatsApiKey = import.meta.env.VITE_COINGECKO_API_KEY;
        const coinStatsUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${periods[period]}&x_cg_demo_api_key=${coinStatsApiKey}`;
        const response = await fetch(coinStatsUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData: ChartData[] = data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price: price,
          })
        );
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [period]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (e: any) => {
    if (e.activeTooltipIndex !== undefined) {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      setTooltipPosition({
        x: e.activeCoordinate?.x || 0,
        y: e.activeCoordinate?.y || 0,
      });
      setTooltipPrice(data[e.activeTooltipIndex].price);
    }
  };

  const handleMouseLeave = () => {
    // Don't reset the tooltip position when mouse leaves
    if (data.length > 0) {
      setTooltipPrice(data[data.length - 1].price);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-lg z-40" />
      )}
      <div
        className={`${
          isFullscreen
            ? "fixed inset-0 z-50 flex items-center justify-center top-20 left-10 h-[800px]"
            : "min-h-screen"
        }`}
      >
        <section
          className={`${
            isFullscreen
              ? "w-full h-full max-w-[1200px] max-h-[800px] bg-white dark:bg-gray-900"
              : "absolute w-[839px] left-[60px] top-[386px]"
          } bg-[#E8E7FF]`}
        >
          <div
            className={`${
              isFullscreen ? "scale-150 translate-x-80 translate-y-10" : ""
            }`}
          >
            <div className="absolute w-[750px] h-[341px] left-0 top-[1px]">
              <div className="absolute w-full h-full left-0 top-0">
                <GridLinesLogo />
              </div>
              <div className="absolute w-full h-[90%] left-0 top-0">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={data}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <defs>
                      <linearGradient
                        id="lightPurpleGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#A594F9"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#E8E7FF"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide />
                    <YAxis
                      domain={["dataMin", "dataMax"]}
                      tickCount={10}
                      scale="linear"
                      hide={true}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6F7177" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      fill="url(#lightPurpleGradient)"
                      stroke="none"
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#4B40EE"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              {tooltipPosition && (
                <>
                  <div
                    className="absolute h-[341px]"
                    style={{ left: `${tooltipPosition.x}px`, top: 0 }}
                  >
                    <VerticalLogo />
                  </div>
                  <div
                    className="absolute w-[750px] h-0"
                    style={{ left: 0, top: `${tooltipPosition.y}px` }}
                  >
                    <HorizontalLogo />
                  </div>
                </>
              )}
            </div>
            {/* VARYING PRICE DIV */}
            {tooltipPrice !== null && tooltipPosition && (
              <div
                className="absolute w-[109px] h-[33px] left-[730px] bg-[#1A243A] rounded-[5px]"
                style={{ top: `${tooltipPosition.y - 16}px` }}
              >
                <span className="absolute inset-0 flex items-center justify-center font-circular text-[18px] leading-[23px] text-white">
                  {formatPrice(tooltipPrice)}
                </span>
              </div>
            )}
            {/* LAST PRICE DIV */}
            {lastPointY !== null && (
              <div
                className="absolute w-[98px] h-[33px] left-[730px] bg-[#4B40EE] rounded-[5px]"
                style={{
                  top: lastPointY >= 324 ? "324px" : `${lastPointY - 16}px`,
                  marginBottom: lastPointY >= 300 ? "10px" : "0",
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center font-circular text-[18px] leading-[23px] text-white">
                  {data.length > 0
                    ? formatPrice(data[data.length - 1].price)
                    : ""}
                </span>
              </div>
            )}
            <div className="absolute px-[5px] top-[303px]">
              <div className="w-full h-full">
                <VolumeLogo />
              </div>
            </div>
          </div>
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <FullscreenIcon />
            </button>
          )}
        </section>
      </div>
    </>
  );
};

export default Chart;
