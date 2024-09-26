import FullscreenIcon from "../assets/fullscreen.svg";
import CompareIcon from "../assets/compare.svg";

const Actions = () => {
  return (
    <section className="w-[750px] h-[33px] relative">
      {/* ACTIONS NAV */}
      <nav className="absolute top-[160px] flex">
        {/* FULL SCREEN */}
        <div className="flex">
          <div className="absolute left-[60px]">
            <FullscreenIcon />
          </div>
          <div className="absolute left-[94px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            Fullscreen
          </div>
        </div>
        {/* COMPARE */}
        <div className="flex">
          <div className="absolute left-[208px]">
            <CompareIcon />
          </div>
          <div className="absolute left-[242px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            Compare
          </div>
        </div>

        {/* TIME */}
        <div className="w-[361px] h-[33px]">
          {/* 1d */}
          <div className="absolute left-[449px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            1d
          </div>
          {/* 3d */}
          <div className="absolute left-[500px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            3d
          </div>
          {/* 1w */}
          <div className="absolute left-[541px] top-[-5px] bg-[#4B40EE] border rounded-[5px] w-[49px] h-[33px]">
            <div className="absolute left-[14px] top-[5px] flex justify-center items-center font-circular text-[18px] text-white leading-[22.77px]">
              1w
            </div>
          </div>
          {/* 1m */}
          <div className="absolute left-[610px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            1m
          </div>
          {/* 6m */}
          <div className="absolute left-[666px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            6m
          </div>
          {/* 1y */}
          <div className="absolute left-[726px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            1y
          </div>
          {/* max */}
          <div className="absolute left-[776px] text-[18px] text-[#6F7177] font-circular leading-[22.77px]">
            max
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Actions;
