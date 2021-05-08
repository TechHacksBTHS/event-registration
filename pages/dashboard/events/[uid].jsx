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
import Preloader from '../../../components/ProgressBar/Preloader';
import { CSVLink } from 'react-csv';
import ExportData from '../../../components/DetailedView/ExportData';

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
    const [isFetching, setIsFetching] = useState(true);

    const router = useRouter();
    const { uid } = router.query;
    const { user } = useAuth();

    const updateSignups = async () => {
        await Axios.get("/api/signups/" + uid).then((result) => {
            setResponses(result.data);
        });
        setIsFetching(false);
    }

    useEffect(async () => {
        setIsFetching(true);
        await updateSignups();
    }, []);

    const renderParticipants = () => {
        // If the user state is not admin, and there are no signups
        if (user && user.permissions !== "admin" && responses.length == 0){
            return [
                <Participant key={Math.random() * 10000} updateSignups={updateSignups} name={user.name} email={user.email} profile={""} status={"not signed up"} type={user.permissions} />
            ]
        }

        // Return all of the signed up participants
        return responses.map((response) => {
            if (response != null){
                return <Participant key={response.uid} uid={response.uid} updateSignups={updateSignups} name={response.user.name} email={response.user.email} profile={""} status="signed up" type={response.user.permissions} />; 
            }
            return null;
        });
    }
    
    return (

        <div className="flex w-full min-h-screen overflow-x-hidden">

            <SideNavBar name={name} accountIcon={accountIcon} permissions={permissions} />

            { isFetching ? 
            <div className="my-24 mx-auto">
                <Preloader /> 
            </div>
            : 

            <div className="flex-1 mx-10 my-8">
                <div className="flex flex-col">

                    <h2 className="mb-4 text-4xl">Detailed View</h2>

                    { user && user.permissions === "admin" ? <EventControl uid={uid}/> : null }
                    
                    <div className="my-8 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                <table className="w-full divide-y divide-gray-200">

                                    <thead className="bg-gray-100">
                                        <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Role
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        { renderParticipants() }
                                    </tbody>
                        
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className="flex">
                    <Link href="/dashboard/events">
                        <button className="px-8 py-4 my-3 mx-6 text-xl text-white bg-orange-700 rounded-xl focus:outline-none">Return</button>
                    </Link>

                    { user && user.permissions === "admin" ? <ExportData responses={responses} /> : null }
                </div>

                <div style={{height: "120px"}}></div>
            </div>

            }
        </div>
    )
}
