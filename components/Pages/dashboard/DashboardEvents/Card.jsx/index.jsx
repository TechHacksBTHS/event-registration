import React from 'react';

export default function DashboardCard() {
    return (
        <div
            className="mt-8 mb-4 flex px-4 py-4 justify-between bg-white
            dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer">
            {/* <!-- Card --> */}

            <div className="flex justify-between">
                {/* <!-- Left side --> */}

                <img className="h-12 w-12 rounded-full object-cover" src="white_logo_dark_bg.PNG" alt="technight"/>

                <div
                    className="ml-4 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>name</span>
                    <span className="mt-2 text-black dark:text-gray-200">
                        Technight 2020
                    </span>
                </div>

                <div
                    className="ml-12 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>Type</span>
                    <span className="mt-2 text-black dark:text-gray-200">
                        Hackathon
                    </span>

                </div>

            </div>

            <div className="flex">
                {/* <!-- Rigt side --> */}

                <div
                    className="mr-16 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>Sponsors</span>
                    <span className="mt-2 text-black dark:text-gray-200">
                        0
                    </span>
                </div>

                <div
                    className="mr-16 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>status</span>
                    <span className="mt-2 text-yellow-600 dark:text-yellow-400">
                        in work
                    </span>
                </div>

                <div
                    className="mr-8 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>event date</span>
                    <span className="mt-2 text-green-400 dark:text-green-200">
                        2021/04/10
                    </span>
                </div>

            </div>

        </div>
    )
}
