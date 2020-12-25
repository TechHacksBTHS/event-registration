import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../contexts/AuthContext';
import Participant from './Participant';

export default function SignUpList({detailedView, setDetailedView}) {

    const [responses, setResponses] = useState([]);

    const updateSignups = async () => {
        Axios.get("/api/signups/" + detailedView).then((result) => {
            setResponses(result.data);
        });
    }

    useEffect(async () => {
        await updateSignups();
    }, []);

    const returnToEventList = () => {
        setDetailedView(-1);
    }

    const renderParticipants = () => {
        const { user } = useAuth();

        if (user.permissions !== "admin" && responses.length == 0){
            return [
                <Participant updateSignups={updateSignups} name={user.name} email={user.email} profile={"https://i.pinimg.com/originals/ee/e7/5d/eee75d6e875e7e205a1394aaa96fad12.png"} status={"not signed up"} type={user.permissions} />
            ]
        }

        return responses.map((response) => {
            if (response != null){
                return <Participant key={response.uid} uid={response.uid} updateSignups={updateSignups} name={response.user.name} email={response.user.email} profile={"https://i.pinimg.com/originals/ee/e7/5d/eee75d6e875e7e205a1394aaa96fad12.png"} status="signed up" type={response.user.permissions} />; 
            }
            return null;
        });
    }
    
    return (
            <div className="mx-10 my-8 flex-1">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">

                                    <thead className="bg-gray-50">
                                        <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                       
                                       {renderParticipants()}
                                        
                                    </tbody>
                        
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="text-white text-xl bg-gray-800 rounded-xl my-3 py-4 px-8" onClick={() => returnToEventList()}>Return</button>
            </div>
    )
}
