import React from "react";
import BubbleText from "./BubbleText";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 items-center max-sm:gap-6">
      <div className="text-5xl max-sm:text-4xl font-inter font-thin text-indigo-300">
        <BubbleText />
      </div>
      <p className="text-base max-sm:text-xs max-sm:text-justify text-indigo-100 w-[500px] max-sm:w-[300px]">
        Attach any cybersecurity audit report as image/pdf or ask a audit-report
        related question…
      </p>
    </div>
  );
};

export default Hero;
