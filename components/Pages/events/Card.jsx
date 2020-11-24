import React, { useContext } from "react";
import { RegistrationModalContext } from "../../../contexts/RegistrationModalContext";
import { EventRegistrationModal } from "./EventRegistrationModal";

function Card(props) {

    const { dispatch, registrationModal } = useContext(RegistrationModalContext);

    const showModal = () => {
        return <EventRegistrationModal key={props.id} name={props.name} description={props.description}/>
    }

    return (
        <div className="m-3 border border-gray-500 shadow bg-white rounded-xl py-8 px-6 text-center w-full overflow-hidden md:w-1/2 lg:w-1/3">
            <div className="mb-4">
                <div className="text-sm text-black font-semibold flex items-center">
                    <img className="fill-current w-6 h-8 mr-2" src={props.iconURL} />
                    {props.type}
                </div>
            </div>
            <div className="mb-4">
                <p className="text-4xl text-gray-900 font-bold">{props.name}</p>
            </div>
            <button className="text-white text-xl bg-gray-800 rounded-xl my-3 py-4 px-16" onClick={() => dispatch({type: "SHOW_MODAL", id: props.id})}>Attend</button>

            {registrationModal == props.id ? showModal() : null}
        </div>
    );
}

export default Card;

