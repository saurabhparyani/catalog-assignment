const Price = () => {
  return (
    <section className="relative h-[122px] w-[326px]">
      <div>
        {/* NUMBER AND USD */}
        <div className="flex">
          {/* NUMBER */}
          <div className="absolute top-[60px] left-[60px]">
            <h1 className="text-[#1A243A] text-[70px] font-circular leading-[88.56px]">
              63,179.71
            </h1>
          </div>
          {/* USD */}
          <div className="absolute top-[77px] left-[337px]">
            <h3 className="font-circular text-[#BDBEBF] text-[24px] leading-[30.36px]">
              USD
            </h3>
          </div>
        </div>

        {/* PRICE CHANGE */}
        <div className="absolute top-[159px] left-[60px]">
          {/* PRICE CHANGE VALUE*/}
          <div className="font-circular text-[18px] leading-[22.77px] text-[#67BF6B]">
            + 2,161.42 (3.54%)
          </div>
        </div>
      </div>
    </section>
  );
};

export default Price;
