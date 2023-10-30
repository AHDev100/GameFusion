"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() { 
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onClick = async function(){
    if(inputRef.current!.value){
      router.push(`/search?searchParam=${inputRef.current!.value}`);
    }
  } 

  return (
    <>  
      <div style={{ 
        backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/007/620/908/non_2x/blue-wave-abstract-background-web-background-blue-texture-banner-design-creative-cover-design-backdrop-minimal-background-illustration-vector.jpg")`, 
        backgroundSize: 'cover', 
        height: 'calc(100vh - 10.5vh)' 
      }}>
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style={{
          top: '30%'
        }}>
          <span className="text-5xl block text-green-300 italic">LEVEL UP YOUR GAMING EXPERIENCE WITH GAMEFUSION 🎮</span>
          <span className="mt-7 text-2xl block text-rose-200">GameFusion is your all-in-one destination for buying, selling, and connecting with fellow gamers in a dynamic and interactive community</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
          top: '47vh'
        }}>
          <input ref={inputRef} className="relative p-2 pr-12 rounded-full border-2 border-gray-300 focus:outline-none" type="text" placeholder="🔎 Enter your game..." />
          <button onClick={onClick} type="button" className="relative mx-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Search</button>
        </div>
      </div>
    </>
  )
}
