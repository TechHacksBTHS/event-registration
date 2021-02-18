import React, { useState } from 'react'
import axios from 'axios';
import SmallSucessAlert from '../../Alerts/SmallSucessAlert';

export const EditButton = ({ uid, updateSignups }) => {
    const [enabledOptions, setEnabledOptions] = useState(false);

    const [showAlert, setShowAlert] = useState(-1);

    const removeParticipant = async () => {
        return await axios.delete("/api/signups/" + uid);
    }

    return (
        <div className="inline-block text-left">
            <div>
                <button className="text-indigo-600 focus:outline-none hover:text-indigo-900" onClick={() => setEnabledOptions(!enabledOptions)}>
                    Options
                </button>
            </div>
                
            { enabledOptions ? 
                <div className="origin-top-right absolute right-0 mr-4 mt-2 w-56 rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {/* <button className="block uppercase w-full px-4 py-2 text-lg tracking-wider text-orange-500 bg-gray-100 hover:bg-orange-500 hover:text-white" role="menuitem">Edit</button> */}
                        <button onClick={async () => {
                            const result = await removeParticipant();
                            await setEnabledOptions(false);
                            await updateSignups();

                            if (result.status == 200){
                                setShowAlert(1);
                            }
                            }} className="block uppercase w-full px-4 py-2 text-lg bg-gray-100 text-red-700 hover:bg-red-700 hover:text-white" role="menuitem">Remove</button>
                    </div>
                </div>
                : null
            }

            { showAlert == 1 ? <SmallSucessAlert content={"Participant removed!"} toggle={() => setShowAlert(-1)} /> : null}
            
        </div>
    )
}
