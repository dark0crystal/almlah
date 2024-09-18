'use client';
import React from "react";
import { useState } from "react";
import Scene from './Scene';
import Projects from './Projects';

const Galleries: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="relative z-10 mix-blend-difference">
        <Projects setActiveMenu={setActiveMenu} />
      </div>
      <div className="fixed top-0 left-0 w-full h-screen -z-10 ">
        <Scene activeMenu={activeMenu} />
      </div>
     
    </div>
  );
}

export default Galleries;