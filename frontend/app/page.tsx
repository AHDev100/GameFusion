"use client";

import { useState } from "react"
import Button from "./components/button";

export default function Home() {
  const [count, setCount] = useState(0); 
  return (
    <div className="h-screen flex items-center justify-center">
      <Button onClick = 
        {() : void => {
          alert(`Setting count to ${count + 1}`);
          setCount(count + 1);
        }} 
      />
      <p className="mr-4">Current count is {count}</p>
    </div>
  )
}
