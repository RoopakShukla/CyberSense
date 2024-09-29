import React from "react";
import BubbleText from "./BubbleText";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-5xl font-inter font-thin text-indigo-300">
        <BubbleText />
      </div>
      <p className="text-base text-indigo-100 w-[500px]">
        Attach any cybersecurity audit report as image/pdf or ask a audit-report
        related question…
      </p>
    </div>
  );
};

export default Hero;
