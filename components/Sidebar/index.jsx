import React, { useState } from 'react';
import { signOut } from '../../services/frontend/authentication';
import FloatingActionButton from '../../components/Buttons/FloatingActionButton';
import UserInfo from './UserInfo';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SideNavBar({ name, accountIcon, permissions}) {
    const [enabledSideMenu, setEnabledSideMenu] = useState(false);

    const activeClasses = "rounded-lg p-3 shadow bg-white dark:bg-gray-200 -ml-4 text-gray-700";

    const router = useRouter();

    const getCSSClasses = (name) => {
        if (name === router.pathname){
            return "mt-8 " + activeClasses;
        }
        return "mt-8";
    }

    const toggleSideMenu = () => {
        setEnabledSideMenu(!enabledSideMenu);
    }

    return (

            <nav className={(enabledSideMenu ? "flex " : "hidden lg:flex ") + "flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6"}>

                <FloatingActionButton action={toggleSideMenu} />

                <div className="flex flex-row border-b items-center justify-between pb-2">
                    <span className="text-lg font-semibold capitalize dark:text-gray-300">
                        my dashboard
                    </span>
                </div>

                <div className="mt-8">
                    <UserInfo accountIcon={accountIcon} name={name} permissions={permissions}/>
                </div>

                <ul className="mt-2 text-black">
                    {/* <!-- Links --> */}

                    <li className={getCSSClasses("/dashboard/overview")}>
                        <Link href="/dashboard/overview">
                            <button className="flex focus:outline-none">
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
                                    overview
                                </span>
                            </button>
                        </Link>
                    </li>

                    <li className={getCSSClasses("/dashboard/events")}>
                        <Link href="/dashboard/events">
                            <button className="flex focus:outline-none">
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
                        </Link>
                    </li>
                    

                    {/* { props.permissions && props.permissions === "admin" ? 
                    <li className={getCSSClasses("/dashboard/users")}>
                        <button className="flex focus:outline-none">
                            <svg className="fill-current w-6 text-gray-400" viewBox="0 0 24 24">
                                <path
                                    d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                                    014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                                    8-4z"></path>
                            </svg>
                            <span className="ml-2 capitalize font-medium text-gray-400">users</span>
                        </button>
                    </li> : null
                    } */}

                </ul>

                <div className="mt-auto flex items-center text-red-700 dark:text-red-400">
                    {/* <!-- important action --> */}
                    <button onClick={async () => await signOut()} className="flex items-center">
                        <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
                                2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
                                0 012-2h9z"></path>
                        </svg>
                        <span className="ml-2 capitalize font-medium">log out</span>
                    </button>

                </div>
            </nav>
            
    )
}