import React, { useEffect, useState } from 'react';
import DashboardCard from '../../../components/EventList/Card';
import fire from '../../../config/fire-config';
import nookies from 'nookies';
import firebaseAdmin from '../../../config/FirebaseAdminConfig';
import { fetchUserWithUID } from '../../api/fetch_user/[uid]';
import SideNavBar from '../../../components/Sidebar';

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

export default function events({name, accountIcon, permissions}) {
    const [upComingEvents, setUpComingEvents] = useState([]); 

    const renderEvents = (upComingEvents) => {
        if (upComingEvents) {
            return upComingEvents.map((item) => {
                return <DashboardCard key={item.id} uid={item.id} logo="/white_logo_dark_bg.PNG" name={item.name} type={item.type} date={item.date} />
            });
        }
    }

    useEffect(() => {
        fire.firestore().collection("events").onSnapshot(snap => {
            const events = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUpComingEvents(events);
        });
    }, []);

    return (
        <div className="min-h-screen w-full flex overflow-x-hidden">

            <SideNavBar name={name} accountIcon={accountIcon} permissions={permissions} />

            <main
                    className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition
                    duration-500 ease-in-out overflow-y-auto">
                    <div className="mx-10 my-2">
                        {/* Heading */}
                        <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
                            Event list
                        </h2>
                        {/* Divider */}
                        <div
                            className="pb-2 flex items-center justify-between text-gray-600
                            dark:text-gray-400 border-b dark:border-gray-600">
                        </div>

                        <div
                            className="mt-6 hidden lg:flex justify-between text-gray-600 dark:text-gray-400">
                            {/* <!-- List sorting --> */}

                            <div className="ml-10 pl-2 flex capitalize">
                                {/* <!-- Left side --> */}
                                <span className="ml-8 flex items-center">
                                    name
                                    <svg
                                        className="ml-1 h-5 w-5 fill-current text-green-500
                                        dark:text-green-200"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
                                            19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
                                    </svg>
                                </span>
                                <span className="ml-24 flex items-center">
                                    type
                                    <svg
                                        className="ml-1 h-5 w-5 fill-current"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
                                            19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
                                    </svg>
                                </span>
                            </div>

                            <div className="flex capitalize">
                                {/* <!-- Right side --> */}

                                <span className="mr-16 flex items-center">
                                    date
                                    <svg
                                        className="ml-1 h-5 w-5 fill-current"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
                                            19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
                                    </svg>
                                </span>
                            </div>

                        </div>

                        {renderEvents(upComingEvents)}

                    </div>

                </main>
            </div>
    );
}
