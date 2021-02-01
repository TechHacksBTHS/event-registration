import React from 'react';

export default function UserInfo(props){
    return (
        <div>
            <img
                className="h-12 w-12 rounded-full object-cover"
                src={ props.accountIcon }
                alt="profile" />
            <h2
                className="mt-4 text-xl dark:text-gray-300 font-extrabold capitalize">
                { props.name }
            </h2>
            <span className="text-sm dark:text-gray-300 font-semibold text-green-600 dark:text-green-300">
                { props.permissions }
            </span>
        </div>
    )
}