import React from 'react';

export default function DashboardHome() {
    return (
        <main
                className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition
                duration-500 ease-in-out overflow-x-hidden overflow-y-auto">

                <div className="mx-10 my-2">
                    <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
                        Dashboard
                    </h2>

                    {/* Divider */}
                    <div
                        className="pb-2 flex items-center justify-between text-gray-600
                        dark:text-gray-400 border-b dark:border-gray-600">
                    </div>
                    

                    <h4 className="my-4 text-4xl text-black text-bold overflow-hidden"><span className="font-bold">TechHacks</span>' Portal <span className="text-orange-600 font-thin">BETA</span></h4>
                    <div className="my-4 text-xl text-white text-center bg-black border-black border-4 p-3 rounded-lg w-full">
                        Use the left navigation bar to check your registration! 
                    </div>

                </div>

        </main>
    )
}
