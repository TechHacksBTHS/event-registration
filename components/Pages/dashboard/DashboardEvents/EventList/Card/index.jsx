import React from 'react';
import styles from './index.module.css';

export default function DashboardCard({logo, name, uid, type, date, showSignups}) {
    date = date.toDate();

    return (
        <div
            className={styles.card + " mt-8 mb-4 px-4 py-4 flex flex-col md:flex-row justify-between bg-white dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer text-xl"} 
            onClick={() => showSignups(uid)}>
            
            {/* <!-- Card --> */}
            
            <div className="flex flex-col md:flex-row justify-between items-center">
                {/* <!-- Left side --> */}

                <img className="h-12 w-12 rounded-full object-cover place-self-center" src={logo} alt="logo"/>

                <div
                    className="md:ml-4 flex flex-col items-center capitalize text-gray-600 dark:text-gray-400">
                    <span>name</span>
                    <span className="mt-2 text-black font-bold dark:text-gray-200">
                        {name}
                    </span>
                </div>

                <div
                    className="md:ml-12 flex flex-col items-center capitalize text-gray-600 dark:text-gray-400">
                    <span>Type</span>
                    <span className="mt-2 text-black dark:text-gray-200">
                        {type}
                    </span>
                </div>

            </div>

            <div className="flex flex-col md:flex-row items-center">
                {/* <!-- Rigt side --> */}
                <div
                    className="flex flex-col items-center md:mr-8 capitalize text-gray-600 dark:text-gray-400">
                    <span>event date</span>
                    <span className="mt-2 text-green-400 dark:text-green-200">
                        {date.toDateString()}
                    </span>
                </div>

            </div>

        </div>
    )
}
