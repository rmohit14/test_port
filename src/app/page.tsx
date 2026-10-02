import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import SelectedWork from "@/components/sections/SelectedWork";
import Services from "@/components/sections/Services";
import WhatWeLift from "@/components/sections/WhatWeLift";
import Process from "@/components/sections/Process";
import Principles from "@/components/sections/Principles";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <Services />
      <WhatWeLift />
      <Process />
      <Principles />
      <FinalCTA />
    </>
  );
}
