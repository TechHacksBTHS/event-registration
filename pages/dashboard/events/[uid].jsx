import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import EventControl from '../../../components/DetailedView/EventControl';
import Participant from '../../../components/DetailedView/Participant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import SideNavBar from '../../../components/Sidebar';
import firebaseAdmin from '../../../config/FirebaseAdminConfig';
import { fetchUserWithUID } from '../../api/fetch_user/[uid]';

export const getServerSideProps = async (ctx) => {
    try {
    const cookies = nookies.get(ctx);
    const verifiedToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = verifiedToken;
    const userData = await fetchUserWithUID(uid);

    return {
        props: {
            name: userData.name,
            permissions: userData.permissions,
            accountIcon: verifiedToken.picture
        }
    };

    } catch (err){
        console.log(err);
        //Error in validating the token
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
        //Props will not matter b/c the route has already been redirected
        return { props: {} };
    }
}

export default function DetailedView({name, accountIcon, permissions}) {

    const [responses, setResponses] = useState([]);
    const router = useRouter();
    const { uid } = router.query;
    const { user } = useAuth();

    const updateSignups = async () => {
        Axios.get("/api/signups/" + uid).then((result) => {
            setResponses(result.data);
        });
    }

    useEffect(async () => {
        await updateSignups();
    }, []);

    const renderParticipants = () => {
        // If the user state is admin, and there are no signups
        if (user && user.permissions !== "admin" && responses.length == 0){
            return [
                <Participant key={Math.random() * 100} updateSignups={updateSignups} name={user.name} email={user.email} profile={"https://i.pinimg.com/originals/ee/e7/5d/eee75d6e875e7e205a1394aaa96fad12.png"} status={"not signed up"} type={user.permissions} />
            ]
        }

        // Return all of the signed up participants
        return responses.map((response) => {
            if (response != null){
                return <Participant key={response.uid} uid={response.uid} updateSignups={updateSignups} name={response.user.name} email={response.user.email} profile={"https://i.pinimg.com/originals/ee/e7/5d/eee75d6e875e7e205a1394aaa96fad12.png"} status="signed up" type={response.user.permissions} />; 
            }
            return null;
        });
    }
    
    return (

        <div className="min-h-screen w-full flex overflow-x-hidden">

            <SideNavBar name={name} accountIcon={accountIcon} permissions={permissions} />

            <div className="mx-10 my-8 flex-1">
                <div className="flex flex-col">

                    <h2 className="text-4xl mb-4">Detailed View</h2>

                    { user && user.permissions === "admin" ? <EventControl uid={uid}/> : null }
                    
                    <div className="my-8 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="w-full divide-y divide-gray-200">

                                    <thead className="bg-gray-100">
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

                <Link href="/dashboard/events">
                    <button className="text-white text-xl bg-gray-800 rounded-xl my-3 py-4 px-8">Return</button>
                </Link>
            </div>
        </div>
    )
}
