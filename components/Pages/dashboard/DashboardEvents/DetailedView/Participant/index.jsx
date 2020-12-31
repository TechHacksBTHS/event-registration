import React from 'react';
import { useAuth } from '../../../../../../contexts/AuthContext';
import { EditButton } from './EditButton';

export default function Participant({uid, name, email, profile, status, type, updateSignups}) {

    const { user } = useAuth();

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
            <td className="px-6 py-4 whitespace-nowrap capitalize">
                <span className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full " + statusColor}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                {type}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                { user && user.permissions === "admin" ? <EditButton uid={uid} updateSignups={updateSignups}/> : null}
                
            </td>
        </tr>
    );
}
