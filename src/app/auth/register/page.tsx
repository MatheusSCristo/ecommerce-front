'use client'
import { useState } from "react";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";

type Steps = {
  [key: number]: React.ComponentType<any>;
};
const steps:Steps={
  1:FirstBox,
  2:SecondBox,
  3:ThirdBox
}

const register = () => {
  const [step,setStep]=useState(1)
  const CurrentStepComp=steps[step];
  return (
    <section className="flex items-center justify-center h-full">
      <div className="p-5 bg-white border-gray-300 border rounded-lg">
        <CurrentStepComp setStep={setStep}/>
        
      </div>
    </section>
  );
};

export default register;
