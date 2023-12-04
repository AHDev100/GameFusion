"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import PopularGame from "./components/popGames";

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onClick = async function () {
    if (inputRef.current!.value) {
      router.push(`/search?searchParam=${inputRef.current!.value}`);
    }
  };

  return (
    <>
      <div
        style={{
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(118,35,134,1) 0%, rgba(0,142,255,1) 133%)',
          backgroundSize: 'cover',
          height: 'calc(100vh - 10.5vh)',
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{
            top: '30%',
          }}
        >
          <span className="text-xl md:text-3xl block text-green-300 italic">
            LEVEL UP YOUR GAMING EXPERIENCE WITH GAMEFUSION 🎮
          </span>
          <span className="mt-7 text-xl md:text-xl block text-rose-200">
            GameFusion is your all-in-one destination for buying, selling, and connecting with fellow gamers in a dynamic and interactive community
          </span>
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            top: '47vh',
          }}
        >
          <input
            ref={inputRef}
            className="relative p-2 pr-12 rounded-full border-2 border-gray-300 focus:outline-none w-64 md:w-96"
            type="text"
            placeholder="🔎 Enter your game..."
          />
          <button
            onClick={onClick}
            type="button"
            className="relative mx-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Search
          </button>
        </div>
      </div>
      <div
        className="absolute hover:scale-110 transition-transform transform"
        style={{
          bottom: '0vh',
          display: 'flex',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <PopularGame
          price="79.99"
          imgSRC="https://s25.q4cdn.com/103200307/files/doc_multimedia/FC24_standardkeyart_16x9.jpg"
          name="EA Sports FC 24"
        />
      </div>
      <div
        className="absolute hover:scale-110 transition-transform transform"
        style={{
          bottom: '0vh',
          display: 'flex',
          left: '27%',
          transform: 'translateX(-50%)',
        }}
      >
        <PopularGame
          price="79.99"
          imgSRC="https://www.techpowerup.com/img/w2xp4R8Hm8OX3YNt.jpg"
          name="EA Sports NHL 24"
        />
      </div>
      <div
        className="absolute hover:scale-110 transition-transform transform"
        style={{
          bottom: '0vh',
          display: 'flex',
          left: '73%',
          transform: 'translateX(-50%)',
        }}
      >
        <PopularGame
          price="119.99"
          imgSRC="https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/extras/NBA24-BASE-METADATA-STEAM_Main_Capsule_616x353.jpg?t=1697814723"
          name="NBA 2K 24"
        />
      </div>
    </>
  );
}
