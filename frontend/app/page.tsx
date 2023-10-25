"use client";

import { useState } from "react"

export default function Home() {
  const [count, setCount] = useState(0); 
  return (
    <>
      <p>Current count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Click Here</button>
    </>
  )
}
