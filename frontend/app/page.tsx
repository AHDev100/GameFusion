"use client";
import { useRef } from "react";

export default function HomePage() { 
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>  
      <div style={{ 
        backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/007/620/908/non_2x/blue-wave-abstract-background-web-background-blue-texture-banner-design-creative-cover-design-backdrop-minimal-background-illustration-vector.jpg")`, 
        backgroundSize: 'cover', 
        height: 'calc(100vh - 10.5vh)' 
      }}>
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
          top: '45%'
        }}>
          <input ref={inputRef} className="p-2 border-2 border-gray-300 rounded-md focus:outline-none" type="text" placeholder="Enter your game..." />
          <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mx-2">Search</button>
        </div>
      </div>
    </>
  )
}
