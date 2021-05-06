import React from "react";
import Link from 'next/link';

function Card(props) {

    return (
        <div className="m-6 border border-gray-500 shadow bg-white rounded-xl py-12 px-6 text-center w-full overflow-hidden md:w-1/2 lg:w-1/3 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105">
            <div className="mb-8 -mt-6">
                <div className="text-sm text-black font-semibold flex items-center text-gray-500">
                    <i className="fill-current fi fi-sr-interrogation text-xl mr-2"></i>
                    {props.type}
                </div>
            </div>
            <div className="mb-4">
                <p className="text-3xl text-gray-900 font-bold">{props.name}</p>
            </div>

            <Link href="/events/[eventId]" as={`/events/${props.id}`}>
                <button className="text-white text-xl bg-gray-800 rounded-xl my-3 py-4 px-16 focus:outline-none transition duration-300 hover:bg-green-400">
                        Attend
                </button>
            </Link>
        </div>
    );
}

export default Card;

