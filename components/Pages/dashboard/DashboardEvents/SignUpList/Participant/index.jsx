import React from 'react';

export default function Participant({name, email, profile, status, type}) {
    const statusColor = status === "signed up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={profile} alt="" />
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        {name}
                    </div>
                    <div className="text-sm text-gray-500">
                        {email}
                    </div>
                </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full " + statusColor}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {type}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
        </tr>
    );
}
