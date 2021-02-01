import React, { useContext, useState } from "react";
import { RegistrationModalContext } from "../../../contexts/RegistrationModalContext";
import fire from "../../../config/fire-config";
import { RegistrationAlertContext } from "../../../contexts/RegistrationAlertContext";
import { useAuth } from "../../../contexts/AuthContext";

export const EventRegistrationModal = (props) => {
    const dispatchModal = useContext(RegistrationModalContext).dispatch;
    const dispatchAlert = useContext(RegistrationAlertContext).dispatch;

    const { user } = useAuth();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [emailLocked, setEmailLocked] = useState(false);

    const [error, setError] = useState({});

    if (user != null && email !== user.email){
        setEmail(user.email); //Force the email to be the account's email
        setEmailLocked(true);
    }

    const handleFirstNameChange = (value) => {
        if (value.length > 0){
            setError({
                ...error,
                "firstName": false
            });
        } else {
            setError({
                ...error,
                "firstName": true
            });
        }
        setFirstName(value);
    }

    const handleLastNameChange = (value) => {
        if (value.length > 0){
            setError({
                ...error,
                "lastName": false
            });
        } else {
            setError({
                ...error,
                "lastName": true
            });
        }
        setLastName(value);
    }

    const handleEmailChange = (value) => {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(value.match(mailformat)){
            setError({
                ...error,
                "email": false
            });
        } else {
            setError({
                ...error,
                "email": true
            });
        }
        setEmail(value);
    }

    const handleSubmit = () => {

        if (firstName.length > 0 && lastName.length > 0 && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setFirstName("");
            setLastName("");
            setEmail("");
            
            if (user != null){
                fire.firestore().collection("formResponses").add({
                    eventID: props.id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userRef: fire.firestore().doc("users/" + user.uid)
                });
            } else {
                fire.firestore().collection("formResponses").add({
                    eventID: props.id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userRef: null
                });
            }

            dispatchModal({type: "DISABLE"});
            dispatchAlert({type: "SUCCESS", payload: props.name});
        } 

        let firstNameError = false;
        let lastNameError = false;
        let emailError = false;

        if (firstName.length < 1){
            firstNameError = true;
        }

        if (lastName.length < 1){
            lastNameError = true;
        } 

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            emailError = true;
        }

        setError({
            ...error,
            firstName: firstNameError,
            lastName: lastNameError,
            email: emailError
        });
        
    }

    const isLockedCSS = (field) => {
        if (field === "email"){
            if (emailLocked){
                return "text-gray-500";
            } else {
                return "text-gray-700";
            }
        }
        return "";
    }

    return (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 transition-opacity duration-500 bg-opacity-75">

            <div className="bg-white rounded-lg w-5/6 sm:w-3/4 xl:w-1/2">

                <div className="flex flex-col items-start p-4">

                    <div className="flex items-center w-full">
                        <div className="text-gray-900 font-bold text-3xl text-center w-full">{props.name}</div>
                        <button onClick={() => dispatchModal({type: "DISABLE"})} className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer">
                            <i className="fi fi-sr-cross"></i>
                        </button>
                    </div>

                    <div className="bg-gray-300 rounded p-4 my-5 w-full text-center text-xl font-medium">{props.description}</div>

                    <form className="w-full">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                                    First Name
                                </label>
                                <input onChange={({target}) => handleFirstNameChange(target.value)} value={firstName} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Your First Name" />
                                {error["firstName"] ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null }
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                                    Last Name
                                </label>
                                <input onChange={({target}) => handleLastNameChange(target.value)} value={lastName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="text" placeholder="Your Last Name" />
                                {error["lastName"] ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null }
                            </div>
                            <div className="w-full px-3 mb-3 md:mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input onChange={({target}) => handleEmailChange(target.value)} value={email} disabled={(emailLocked ? "disabled" : "")} className={"appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + isLockedCSS("email")} id="email"  type="email" placeholder="participant@techhacks.nyc"/>
                                {error["email"] ? <p className="text-red-500 text-xs italic">Please fill out this field with a valid email address.</p> : null }
                            </div>
                        </div>
                    </form>
                </div>

                <button onClick={() => handleSubmit()} className="uppercase font-bold w-full bg-gray-800 text-lg text-white rounded-b-lg p-3 focus:outline-none">Participate</button>

            </div>
        </div>
    )
}
