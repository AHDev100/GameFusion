"use client";

import { FaInstagram } from "react-icons/fa";

export default function StyledInstagram() {
  const iconStyle = {
    fontSize: "7rem",
    color: "white",
    transition: "color 0.5s, transform 0.5s",
    marginTop: "1.5rem", 
    marginLeft: "3rem"
  };

  const handleHover = (e : any) => {
    e.target.style.color = "red";
    e.target.style.transform = "rotate(360deg)";
  };

  const handleLeave = (e: any) => {
    e.target.style.color = "white";
    e.target.style.transform = "rotate(0deg)";
  };

  return (
    <div>
      <h1 className="font-sans text-5xl block text-amber-300">Instagram</h1>
      <FaInstagram
        style={iconStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      />
    </div>
  );
}
