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
        <div className="flex w-full min-h-screen overflow-x-hidden">

            <SideNavBar name={props.name} accountIcon={props.accountIcon} permissions={props.permissions} />
            
            <main
                className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-700">

                <div className="mx-10 my-2">
                    <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
                        Dashboard
                    </h2>

                    {/* Divider */}
                    <div
                        className="flex items-center justify-between pb-2 text-gray-600 border-b dark:text-gray-400 dark:border-gray-600">
                    </div>
                    
                    <div className={styles.content}>
                        <h4 className="my-4 overflow-hidden text-4xl text-black text-bold"><span className="font-bold">TechHacks's</span> Portal <span className="text-3xl fi fi-sr-home"></span></h4>
                        <div className="w-full p-3 my-4 text-xl text-center">
                            Use the left navigation bar to check your registration! 
                        </div>
                    </div>

                </div>

            </main>

        </div>
    )
}
