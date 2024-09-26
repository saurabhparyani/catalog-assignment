import { useState } from "react";
import FullscreenIcon from "../assets/fullscreen.svg";
import CompareIcon from "../assets/compare.svg";
import { useFullscreen } from "../hooks/useFullscreen";

const Actions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1w");
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <section className="absolute w-[750px] h-[33px] left-[60px] top-[325px]">
      <div className="flex justify-between items-center">
        {/* FULLSCREEN AND COMPARE */}
        <div className="flex items-center">
          {/* FULLSCREEN */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2.5 text-[#6F7177]"
          >
            <div className="w-[24px] h-[24px]">
              <FullscreenIcon />
            </div>
            <span className="font-circular text-[18px] leading-[23px]">
              Fullscreen
            </span>
          </button>
          {/* COMPARE */}
          <button
            className={`${
              isFullscreen
                ? "hidden"
                : "flex items-center space-x-2.5 text-[#6F7177] ml-[31px]"
            }`}
          >
            <div className="w-[24px] h-[24px]">
              <CompareIcon />
            </div>
            <span className="font-circular text-[18px] leading-[23px]">
              Compare
            </span>
          </button>
        </div>

        {/* PERIODS */}
        <div className={`flex items-center ${isFullscreen ? "ml-40" : ""}`}>
          {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((period, index) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`font-circular text-[18px] leading-[23px] ${
                period === selectedPeriod
                  ? "bg-[#4B40EE] text-white"
                  : "text-[#6F7177]"
              } ${
                index > 0 ? "ml-[14px]" : ""
              } w-[45px] h-[33px] flex items-center justify-center rounded-[5px]`}
            >
              <span className="px-[14px] py-[5px]">{period}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Actions;
