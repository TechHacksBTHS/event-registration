import { useRouter } from 'next/router';
import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';

export default function DashboardCard({logo, name, uid, type, date}) {
    date = date.toDate();
    return (
        <Link href={"/dashboard/events/" + uid}>
            <div className={styles.card + " mt-4 mb-4 px-4 py-4 flex flex-col md:flex-row justify-between bg-white dark:bg-gray-600 shadow rounded-lg cursor-pointer text-xl"} >
                
                {/* <!-- Card --> */}
                
                <div className="flex flex-col items-center justify-between md:flex-row">
                    {/* <!-- Left side --> */}

                    <img className="object-cover w-12 h-12 rounded-full place-self-center" src={logo} alt="logo"/>

                    <div className="flex flex-col self-start text-gray-600 capitalize md:ml-4 dark:text-gray-400">
                        <span>name</span>
                        <span className="mt-2 font-bold text-black dark:text-gray-200">
                            {name}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center md:flex-row">
                    {/* <!-- Right side --> */}

                    <div className="flex flex-col self-start text-gray-600 capitalize md:mr-16 dark:text-gray-400">
                        <span>Type</span>
                        <span className="mt-2 text-black dark:text-gray-200">
                            {type}
                        </span>
                    </div>

                    <div className="flex flex-col self-start font-mono text-gray-600 capitalize md:mr-8 dark:text-gray-400">
                        <span>event date</span>
                        <span className="mt-2 text-green-400 dark:text-green-200">
                            {date.toDateString()}
                        </span>
                    </div>

                </div>
            </div>
        </Link>
    )
}
