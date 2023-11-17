import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

export default function About() {
    return (
      <section className="flex items-center bg-stone-50 xl:h-screen font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap items-center ">
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <div className="lg:max-w-md">
                        <span className="text-3xl font-semibold text-blue-600 uppercase dark:text-blue-500">
                            About GameFusion</span>
                        <h2 className="mt-4 mb-6 text-2xl font-bold dark:text-gray-300 text-left">
                        Your all-in-one destination for buying, selling, and connecting with fellow gamers </h2>
                        <p className="mb-10 text-gray-600 dark:text-gray-400 ">
                        Our mission is to provide gamers with a platform where they can discover, trade, and discuss their favorite games.</p>
                        <p className="mb-10 text-gray-600 dark:text-gray-400 mt-[-20px]">
                        Whether you're looking to buy the latest releases, sell your collection, or engage with like-minded gamers, GameFusion has you covered.</p>
                    </div>
                </div>
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <div className="flex mb-10">
                        <span
                            className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-blue-500 rounded dark:bg-blue-500 dark:text-gray-100 text-gray-50">
                            <IoGameControllerOutline size={32}/>
                        </span>
                        <div>
                            <h2 className="mb-2 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                                Enjoy
                            </h2>
                            <p className="text-base text-gray-500 dark:text-gray-400">
                            Buy and sell video games, consoles, and accessories. Discover trending games and upcoming releases.
                            </p>
                        </div>
                    </div>
                    <div className="flex mb-10">
                        <span
                            className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-blue-500 rounded dark:bg-blue-500 dark:text-gray-100 text-gray-50">
                            <HiOutlineGlobeAlt size={32}/>
                        </span>
                        <div>
                            <h2 className="mb-2 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                                Connect
                            </h2>
                            <p className="text-base text-gray-500 dark:text-gray-400">
                              Connect with gamers from around the world. Participate in discussions, share tips and tricks, and stay updated with the latest gaming news. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}
