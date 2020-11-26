import React, { useState } from 'react';
import DashboardEvents from '../components/Pages/dashboard/DashboardEvents';
import DashboardHome from '../components/Pages/dashboard/DashboardHome';
import DashboardUsers from '../components/Pages/dashboard/DashboardUsers';

export default function dashboard() {
    const [currentSection, setCurrentSection] = useState("DashboardHome");

    const showCurrentSection = () => {
        if (currentSection === "DashboardHome"){
            return <DashboardHome />
        } else if (currentSection === "DashboardEvents"){
            return <DashboardEvents />
        } else if (currentSection === "DashboardUsers"){
            return <DashboardUsers />
        }
    }

    const activeClasses = "rounded-lg p-3 shadow bg-white dark:bg-gray-200 -ml-4 text-gray-600";

    const getCSSClasses = (name) => {
        if (name === currentSection){
            return "mt-8 " + activeClasses;
        }
        return "mt-8";
    }

    return (
        <div className="h-screen w-full flex overflow-hidden">
            <nav className="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6">
                {/* <!-- SideNavBar --> */}

                <div className="flex flex-row border-b items-center justify-between pb-2">
                    {/* <!-- Hearder --> */}
                    <span className="text-lg font-semibold capitalize dark:text-gray-300">
                        my admin
                    </span>
                </div>

                <div className="mt-8">
                    {/* <!-- User info --> */}
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://i.pinimg.com/originals/f3/e1/b8/f3e1b8019f160f88531d8af792716b4f.png"
                        alt="enoshima profile" />
                    <h2
                        className="mt-4 text-xl dark:text-gray-300 font-extrabold capitalize">
                        Mark Antony
                    </h2>
                    <span className="text-sm dark:text-gray-300 font-semibold text-green-600 dark:text-green-300">
                        Admin
                    </span>
                </div>

                <ul className="mt-2 text-black">
                    {/* <!-- Links --> */}

                    <li className={getCSSClasses("DashboardHome")}>
                        <button onClick={() => setCurrentSection("DashboardHome")} className="flex focus:outline-none">
                            <svg
                                className="fill-current w-6 dark:text-gray-300"
                                viewBox="0 0 24 24">
                                <path
                                    d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                                    4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                                    4h4v-4h-4M4 8h4V4H4v4z"></path>
                            </svg>
                            <span
                                className="ml-2 capitalize font-medium">
                                dashboard
                            </span>
                        </button>
                    </li>

                    <li className={getCSSClasses("DashboardEvents")}>
                        <button onClick={() => setCurrentSection("DashboardEvents")} className="flex focus:outline-none">
                            <svg
                                className="fill-current w-6 dark:text-gray-300"
                                viewBox="0 0 24 24">
                                <path
                                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                                    2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                                    00-2-2h-1V1m-1 11h-5v5h5v-5z"></path>
                            </svg>
                            <span
                                className="ml-2 capitalize font-medium
                                dark:text-gray-300">
                                Events
                            </span>
                        </button>
                    </li>

                    <li className={getCSSClasses("DashboardUsers")}>
                        <button onClick={() => setCurrentSection("DashboardUsers")} className="flex focus:outline-none">
                            <svg className="fill-current w-6" viewBox="0 0 24 24">
                                <path
                                    d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                                    014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                                    8-4z"></path>
                            </svg>
                            <span className="ml-2 capitalize font-medium">users</span>
                        </button>
                    </li>

                </ul>

                <div className="mt-auto flex items-center text-red-700 dark:text-red-400">
                    {/* <!-- important action --> */}
                    <a href="#home" className="flex items-center">
                        <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
                                2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
                                0 012-2h9z"></path>
                        </svg>
                        <span className="ml-2 capitalize font-medium">log out</span>
                    </a>

                </div>
            </nav>
            
            {showCurrentSection()}

        </div>
    )
}