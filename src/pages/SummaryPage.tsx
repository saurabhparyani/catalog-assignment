import Menu from "../components/Menu";
import Price from "../components/Price";

const SummaryPage = () => {
  return (
    <>
      <div className="relative">
        <Price />
        <Menu />
        <div className="absolute top-[300px] left-[60px]  max-w-[1000px] mx-auto">
          <h2 className="text-4xl font-bold mb-4 font-circular leading-[23px]">
            Bitcoin Summary
          </h2>
          <p className="mb-6 text-lg font-circular leading-[23px]">
            Bitcoin is the world's first and largest cryptocurrency, created in
            2009 by an unknown person using the pseudonym Satoshi Nakamoto. It
            operates on a decentralized network using blockchain technology,
            allowing for peer-to-peer transactions without the need for
            intermediaries like banks.
          </p>
          <p className="mb-6 text-lg font-circular leading-[23px]">
            Key features of Bitcoin include:
          </p>
          <ul className="list-disc list-inside mb-6 text-lg font-circular leading-[23px]">
            <li>Limited supply of 21 million coins</li>
            <li>Halving events every four years to control inflation</li>
            <li>Proof-of-Work consensus mechanism</li>
            <li>Pseudonymous transactions</li>
            <li>Global accessibility</li>
          </ul>
          <p className="text-lg font-circular leading-[23px]">
            Bitcoin has gained significant attention as a store of value and
            potential hedge against inflation, often referred to as "digital
            gold." Its price is known for its volatility, which presents both
            opportunities and risks for investors.
          </p>
        </div>
      </div>
    </>
  );
};

export default SummaryPage;
