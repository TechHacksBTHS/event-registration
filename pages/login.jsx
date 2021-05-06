import React, { useState } from 'react';
import Fire from '../config/fire-config';

export default function login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        // console.log(email);
        // console.log(password);

        e.preventDefault();

        Fire.auth().signInWithEmailAndPassword(email, password).then((response) => {
            console.log(response.user);
            console.log(response.user.uid);
        }).catch((error) => {
            console.log(error.message);
        });

        setEmail("");
        setPassword("");
    }

    return (
        <div className="w-full">
            <div className="w-full px-5 py-4 mx-auto my-8 text-gray-200 bg-gray-700 border rounded-md md:2/3 lg:w-1/2">
                <h2 className="text-6xl text-center">Login</h2>

                <form className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    <div>
                        <button onClick={(e) => handleSubmit(e)} className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md group hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                {/* <!-- Heroicon name: lock-closed --> */}
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    
    )
}
