import ChartLogo from "../assets/chart.svg";
import LineLogo from "../assets/line.svg";
import VerticalLogo from "../assets/vertical.svg";
import HorizontalLogo from "../assets/horizontal.svg";
import GridLinesLogo from "../assets/grid.svg";
import VolumeLogo from "../assets/volume.svg";
import { useFullscreen } from "../hooks/useFullscreen";
import FullscreenIcon from "../assets/fullscreen.svg";

const Chart = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

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
              <div className="absolute w-full h-full left-0 top-0">
                <ChartLogo />
              </div>
              <div className="absolute w-full h-[273px] left-0 top-[2px]">
                <LineLogo />
              </div>
              <div className="absolute w-0 h-[341px] left-[330px] top-0">
                <VerticalLogo />
              </div>
              <div className="absolute w-[750px] h-0 left-0 top-[61px]">
                <HorizontalLogo />
              </div>
            </div>
            <div className="absolute w-[109px] h-[33px] left-[730px] top-[45px] bg-[#1A243A] rounded-[5px]">
              <span className="absolute left-[14px] top-[5px] font-circular text-[18px] leading-[23px] text-white">
                64,850.35
              </span>
            </div>
            <div className="absolute w-[98px] h-[33px] left-[730px] top-[134px] bg-[#4B40EE] rounded-[5px]">
              <span className="absolute left-[14px] top-[5px] font-circular text-[18px] leading-[23px] text-white">
                63,179.71
              </span>
            </div>
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
