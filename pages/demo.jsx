import React from 'react';
import nookies from 'nookies';
import firebaseAdmin from '../config/FirebaseAdminConfig';
import { fetchUserWithUID } from './api/fetch_user/[uid]';

export const getServerSideProps = async (ctx) => {

    try {
        const cookies = nookies.get(ctx);
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    
        // the user is authenticated!
        const { uid } = token;
    
        // Data fetching using backend services
        const data = await fetchUserWithUID(uid);

        return {
          props: { 
              uid: uid,
              name: data.name,
              permissions: data.permissions
            },
        };
      } catch (err) {

        //Error in validating the token

        console.log(err);
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
        
        //Props will not matter b/c the route has already been redirected
        return { props: {} };
      }
}

export default function demo(props) {
    return (
        <div className="mx-8 my-6">
            <h4 className="text-4xl">Hello, <span className="text-green-500 font-bold capitalize">{props.permissions}</span> {props.name}.</h4>
            <h3 className="text-3xl">UID: {props.uid}</h3>
        </div>
    )
}
