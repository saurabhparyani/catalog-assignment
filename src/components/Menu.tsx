import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const getTabStyle = (path: string) => {
    const isActive = location.pathname === path;
    return `absolute top-0 z-10 ${
      isActive
        ? "text-[#1A243A] border-b-[3px] border-[#4B40EE] pb-[10px]"
        : "text-[#6F7177]"
    }`;
  };

  return (
    <section className="absolute w-[1000px] h-[43px] left-0 top-[222px]">
      <nav className="relative">
        <Link
          to="/summary"
          className={`${getTabStyle("/summary")} left-[60px]`}
        >
          <h3 className="font-circular text-[18px] leading-[23px]">Summary</h3>
        </Link>
        <Link to="/chart" className={`${getTabStyle("/chart")} left-[168px]`}>
          <h3 className="font-circular text-[18px] leading-[23px]">Chart</h3>
        </Link>
        <Link
          to="/statistics"
          className={`${getTabStyle("/statistics")} left-[245px]`}
        >
          <h3 className="font-circular text-[18px] leading-[23px]">
            Statistics
          </h3>
        </Link>
        <Link
          to="/analysis"
          className={`${getTabStyle("/analysis")} left-[350px]`}
        >
          <h3 className="font-circular text-[18px] leading-[23px]">Analysis</h3>
        </Link>
        <Link
          to="/settings"
          className={`${getTabStyle("/settings")} left-[447px]`}
        >
          <h3 className="font-circular text-[18px] leading-[23px]">Settings</h3>
        </Link>
      </nav>
      {/* BORDER */}
      <div className="border-b-[1px] border-[#EFF1F3] absolute pt-[35px] w-full z-0" />
    </section>
  );
};

export default Menu;
