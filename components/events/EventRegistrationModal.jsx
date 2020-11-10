import React, { useContext, useState } from "react";
import { RegistrationModalContext } from "../../contexts/RegistrationModalContext";
import fire from "../../config/fire-config";

export const EventRegistrationModal = (props) => {
    const { dispatch } = useContext(RegistrationModalContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log(firstName + " " + lastName + " " + email);
        setFirstName("");
        setLastName("");
        setEmail("");

        fire.firestore().collection("formResponses").add({
            firstName: firstName,
            lastName: lastName,
            email: email
        });

        dispatch({type: "DISABLE"});
    }

    return (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg w-5/6 sm:w-3/4 xl:w-1/2">
                <div className="flex flex-col items-start p-4">
                    <div className="flex items-center w-full">
                        <div className="text-gray-900 font-bold text-3xl text-center w-full">{props.name}</div>
                        <button onClick={() => dispatch({type: "DISABLE"})} className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                            </svg>
                        </button>
                    </div>

                    <div className="bg-gray-300 rounded p-4 my-5 w-full text-center text-xl font-medium">{props.description}</div>

                    <form className="w-full">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                                    First Name
                                </label>
                                <input onChange={({target}) => setFirstName(target.value)} value={firstName} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Matt" />
                                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                                    Last Name
                                </label>
                                <input onChange={({target}) => setLastName(target.value)} value={lastName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="text" placeholder="Bilik" />
                            </div>
                            <div className="w-full px-3 mb-3 md:mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input onChange={({target}) => setEmail(target.value)} value={email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email"  type="email" placeholder="participant@techhacks.nyc"/>
                            </div>
                        </div>
                    </form>
                </div>

                <button onClick={() => handleSubmit()} className="uppercase font-bold w-full bg-gray-800 text-lg text-white rounded-b-lg p-3 focus:outline-none">Participate</button>

            </div>
        </div>
    )
}
