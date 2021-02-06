import React, { useEffect, useState } from 'react';
import DashboardCard from '../../../components/DashboardCard';
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

    } catch (err) {
        console.log(err);
        //Error in validating the token
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
        //Props will not matter b/c the route has already been redirected
        return { props: {} };
    }
}

export default function events({ name, accountIcon, permissions }) {
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
        <div className="flex w-full min-h-screen overflow-x-hidden">

            <SideNavBar name={name} accountIcon={accountIcon} permissions={permissions} />

            <main className="flex flex-col flex-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-700">
                <div className="mx-10 my-2">
                    {/* Heading */}
                    <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
                        Event list
                        </h2>
                    {/* Divider */}
                    <div className="flex items-center justify-between pb-2 text-gray-600 border-b dark:text-gray-400 dark:border-gray-600">
                    </div>

                    <div className="justify-between hidden mt-6 text-gray-600 lg:flex dark:text-gray-400">
                        {/* <!-- List sorting --> */}

                        <div className="flex pl-2 ml-10 capitalize">
                            {/* <!-- Left side --> */}
                            <span className="flex items-center ml-8">
                                name
                                    <svg
                                    className="w-5 h-5 ml-1 text-green-500 fill-current dark:text-green-200"
                                    viewBox="0 0 24 24">
                                    <path d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
                                            19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
                                </svg>
                            </span>
                        </div>

                        <div className="flex capitalize">
                            {/* <!-- Right side --> */}

                            <span className="flex items-center mr-24">
                                type
                                    <svg className="w-5 h-5 ml-1 fill-current" viewBox="0 0 24 24">
                                    <path d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
                                            19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"></path>
                                </svg>
                            </span>

                            <span className="flex items-center mr-40">
                                date
                                    <svg className="w-5 h-5 ml-1 fill-current" viewBox="0 0 24 24">
                                    <path d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
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
