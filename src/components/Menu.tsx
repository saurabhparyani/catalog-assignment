const Menu = () => {
  return (
    <section className="relative w-[1000px] h-[43px]">
      {/* MENU NAV */}
      <nav className="flex absolute top-[102px]">
        {/* SUMMARY */}
        <div className="absolute left-[60px]">
          <h3 className="font-circular text-[18px] leading-[22.77px] text-[#6F7177]">
            Summary
          </h3>
        </div>
        {/* CHART */}
        <div className="absolute left-[168px]">
          <h3 className="font-circular text-[18px] leading-[22.77px] text-#1A243A">
            Chart
          </h3>
        </div>
        {/* STATISTICS */}
        <div className="absolute left-[245px]">
          <h3 className="font-circular text-[18px] leading-[22.77px] text-[#6F7177]">
            Statistics
          </h3>
        </div>
        {/* ANALYSIS */}
        <div className="absolute left-[350px]">
          <h3 className="font-circular text-[18px] leading-[22.77px] text-[#6F7177]">
            Analysis
          </h3>
        </div>
        {/* SETTINGS */}
        <div className="absolute left-[447px]">
          <h3 className="font-circular text-[18px] leading-[22.77px] text-[#6F7177]">
            Settings
          </h3>
        </div>
      </nav>
      {/* BORDERS */}
      <div className="border-b-[3px] border-[#4B40EE] absolute pt-[132px] ml-[158px] w-[67px]" />
      <div className="border-b-[1px] border-[#EFF1F3] absolute pt-[134px] w-full" />
    </section>
  );
};

export default Menu;
