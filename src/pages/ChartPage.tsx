import { useState } from "react";
import Actions from "../components/Actions";
import Chart from "../components/Chart";
import Menu from "../components/Menu";
import Price from "../components/Price";
import CompareDrawer from "../components/CompareDrawer";

const ChartPage = () => {
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1w");

  const handleCompareClick = () => {
    setIsCompareDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsCompareDrawerOpen(false);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Price />
          <Menu />
          <Actions
            onCompareClick={handleCompareClick}
            onPeriodChange={handlePeriodChange}
          />
          <Chart period={selectedPeriod} />
        </div>
      </div>
      <CompareDrawer isOpen={isCompareDrawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};

export default ChartPage;
