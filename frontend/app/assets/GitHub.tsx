"use client";

import { FaGithub } from "react-icons/fa";

export default function StyledGithub() {
  const iconStyle = {
    fontSize: "7rem",
    color: "white",
    transition: "color 0.5s, transform 0.5s",
    marginTop: "1.5rem", 
    marginLeft: "2rem"
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
      <h1 className="font-sans text-5xl block text-amber-300 ml-4">GitHub</h1>
      <FaGithub
        style={iconStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      />
    </div>
  );
}
