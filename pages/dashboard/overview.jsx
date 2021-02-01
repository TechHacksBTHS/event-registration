import React from 'react';
import nookies from 'nookies';
import firebaseAdmin from '../../config/FirebaseAdminConfig';
import { fetchUserWithUID } from '../api/fetch_user/[uid]';
import styles from './overview.module.css';
import SideNavBar from '../../components/Sidebar';

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
        //Error in validating the token
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
        //Props will not matter b/c the route has already been redirected
        return { props: {} };
    }
}

export default function overview(props) {

    return (
        <div className="min-h-screen w-full flex overflow-x-hidden">

            <SideNavBar name={props.name} accountIcon={props.accountIcon} permissions={props.permissions} />
            
            <main
                className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition
                duration-500 ease-in-out overflow-x-hidden overflow-y-auto">

                <div className="mx-10 my-2">
                    <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
                        Dashboard
                    </h2>

                    {/* Divider */}
                    <div
                        className="pb-2 flex items-center justify-between text-gray-600
                        dark:text-gray-400 border-b dark:border-gray-600">
                    </div>
                    
                    
                    <div className={styles.content}>
                        <h4 className="my-4 text-4xl text-black text-bold overflow-hidden"><span className="font-bold">TechHacks</span>' Portal <span className="fi fi-sr-home text-3xl"></span></h4>
                        <div className="my-4 text-xl text-white text-center bg-black border-black border-4 p-3 rounded-lg w-full">
                            Use the left navigation bar to check your registration! 
                        </div>
                    </div>

                </div>

            </main>

        </div>
    )
}
