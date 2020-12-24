import React from 'react';

export default function DashboardCard({logo, name, uid, type, date, showSignups}) {
    date = date.toDate();

    return (
        <div
            className="mt-8 mb-4 flex px-4 py-4 justify-between bg-white
            dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer text-xl" onClick={() => showSignups(uid)}>
            {/* <!-- Card --> */}

            <div className="flex justify-between">
                {/* <!-- Left side --> */}

                <img className="h-12 w-12 rounded-full object-cover place-self-center" src={logo} alt="logo"/>

                <div
                    className="ml-4 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>name</span>
                    <span className="mt-2 text-black font-bold dark:text-gray-200">
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
                    className="mr-8 flex flex-col capitalize text-gray-600
                    dark:text-gray-400">
                    <span>event date</span>
                    <span className="mt-2 text-green-400 dark:text-green-200">
                        {date.toDateString() + " " + date.toLocaleTimeString() + " ET"}
                    </span>
                </div>

            </div>

        </div>
    )
}
