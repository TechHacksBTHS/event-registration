import React from 'react';

export default function DashboardCard({logo, name, type, sponsors, status, date}) {
    return (
        <div
            className="mt-8 mb-4 flex px-4 py-4 justify-between bg-white
            dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer">
            {/* <!-- Card --> */}

            <div className="flex justify-between">
                {/* <!-- Left side --> */}

                <img className="h-12 w-12 rounded-full object-cover" src={logo} alt="logo"/>

                <div
                    className="ml-4 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>name</span>
                    <span className="mt-2 text-black dark:text-gray-200">
                        {name}
                    </span>
                </div>

                <div
                    className="ml-12 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>Type</span>
                    <span className="mt-2 text-black dark:text-gray-200">
                        {type}
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
                        {sponsors}
                    </span>
                </div>

                <div
                    className="mr-16 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>status</span>
                    <span className="mt-2 text-yellow-600 dark:text-yellow-400">
                        {status}
                    </span>
                </div>

                <div
                    className="mr-8 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>event date</span>
                    <span className="mt-2 text-green-400 dark:text-green-200">
                        {date}
                    </span>
                </div>

            </div>

        </div>
    )
}
