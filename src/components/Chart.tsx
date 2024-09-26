import ChartLogo from "../assets/chart.svg";
import LineLogo from "../assets/line.svg";
import VerticalLogo from "../assets/vertical.svg";
import HorizontalLogo from "../assets/horizontal.svg";
import GridLinesLogo from "../assets/grid.svg";
import VolumeLogo from "../assets/volume.svg";

const Chart = () => {
  return (
    <section className="w-[839px] relative h-screen">
      {/* GRID LINES */}
      <div className="absolute top-[186px] left-[60px]">
        <GridLinesLogo />
      </div>

      {/* CHART AND LINES */}
      <div className="absolute top-[187px] left-[60px] w-[750px] h-[341px]">
        <div className="w-full h-full">
          <ChartLogo />
        </div>
        <div className="w-full h-full absolute top-0 left-0">
          <LineLogo />
        </div>
      </div>

      {/* VERTICAL DOTTED LINE */}
      <div className="absolute top-[186px] left-[390px]">
        <VerticalLogo />
      </div>

      {/* HORIZONTAL DOTTED LINE */}
      <div className="absolute top-[246px] left-[60px]">
        <HorizontalLogo />
      </div>

      {/* LABELS */}
      <div className="absolute left-[790px] top-[231px] w-[109px] h-[33px] bg-[#1A243A] rounded-[5px] px-[14px] py-[5px]">
        <div className="text-white font-circular text-[18px] leading-[22.77px]">
          64,850.35
        </div>
      </div>
      <div className="absolute left-[790px] flex items-center justify-center top-[320px] w-[98px] h-[33px] bg-[#4B40EE] rounded-[5px] px-[14px] py-[5px]">
        <div className="text-white flex items-center justify-center font-circular text-[18px] leading-[22.77px]">
          63,179.71
        </div>
      </div>

      {/* VOLUME GRAPH */}
      <div className="absolute top-[490px] left-[65px]">
        <VolumeLogo />
      </div>
    </section>
  );
};

export default Chart;
