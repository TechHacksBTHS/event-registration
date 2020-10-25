import React from 'react';

export default function Card(props) {
    return (
        <div className="m-4 px-6 border border-gray-500 bg-white rounded p-4 flex flex-col justify-between leading-normal">
            <div className="mb-4">
                <div className="text-sm text-gray-400 flex items-center">
                    <img className="fill-current w-6 h-8 mr-2" src={props.iconURL} />
                    {props.description}
                </div>
            </div>
            <div className="mb-4">
                <p className="text-3xl text-gray-900 font-bold">{props.name}</p>
            </div>
            <button className="text-white bg-gray-800 rounded p-3">Sign Up</button>
        </div>
    )
}

