import Actions from "../components/Actions";
import Chart from "../components/Chart";
import Menu from "../components/Menu";
import Price from "../components/Price";

const ChartPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <Price />
          <Menu />
          <Actions />
          <Chart />
        </div>
      </div>
    </>
  );
};

export default ChartPage;
