import React from "react";
import DemoProduct from "./Demoproduct/Demoproduct";
import ShippingInfo from "./shippingInfo/ShippingInfo";

const Demo = () => {
  return (
    <div>
  
      <div className=" lg:px-[1.8rem] px-[10px] lg:flex justify-center gap-8 lg:mb-32">
        <div className=" lg:w-[700px]">
          <ShippingInfo />
        </div>

        <div className=" ">
          <DemoProduct />
        </div>
      </div>
    </div>
  );
};

export default Demo;
