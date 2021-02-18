import { enUS } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import { DatePicker } from 'react-nice-dates'
import Firebase from 'firebase/app';
import 'react-nice-dates/build/style.css'

import Axios from 'axios';
import SmallSucessAlert from '../../Alerts/SmallSucessAlert';

export default function EventControl({ uid }) {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [sponsors, setSponsors] = useState(0);
    const [date, setDate] = useState(new Date());

    const [showAlert, setShowAlert] = useState(-1); // -1:none, 1:success, 2:failure

    const fetchEventDetails = () => {
        Axios.get("/api/events/" + uid).then((result) => {
            result = result.data;
            setName(result.name);
            setType(result.type);
            setDescription(result.description);
            setStatus(result.status);
            setSponsors(result.sponsors);
            setDate((new Firebase.firestore.Timestamp(result.date._seconds, result.date._nanoseconds)).toDate());
        });
    }

    useEffect(async () => {
        await fetchEventDetails();
    }, []);

    const saveDetails = async (e) => {
        e.preventDefault();
        const timestamp = Firebase.firestore.Timestamp.fromDate(date);
        const result = await Axios.put("/api/events/" + uid, {name, type, description, date: timestamp, sponsors, status});
        if (result.status == 200){
            setShowAlert(1);
        }
    }

    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">

                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Event Details</h3>
                        <p className="mt-1 text-sm text-gray-600">
                        View and modify event details
                        </p>
                    </div>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form>
                        <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">Event Name</label>
                                    <input type="text" name="event-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 border-2 h-10 block w-full shadow-sm px-3 sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="event-type" className="block text-sm font-medium text-gray-700">Event Type</label>
                                    <select name="event-type" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={(e) => setType(e.target.value)} value={type}>
                                        <option value="hackathon">Hackathon</option>
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="event-desc">Description</label>
                                    <textarea name="event-desc" rows="3" className="shadow-sm focus:outline-none focus:ring-indigo-500 border-2 p-2 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter some event descriptions." value={description} onChange={(e) => setDescription(e.target.value)}/>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="event-date">Date</label>
                                    <DatePicker date={date} onDateChange={setDate} locale={enUS} format='MM/dd/yyyy HH:mm'>
                                        {({ inputProps }) => <input className="mt-1 border-2 h-10 block w-full shadow-sm px-3 sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" {...inputProps}/>}
                                    </DatePicker>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="event-status">Status</label>
                                    <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="In Work">In Work</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="event-sponsors">Sponsors</label>
                                    <input value={sponsors} onChange={(e) => setSponsors(e.target.value)} className="mt-1 border-2 h-10 block w-full shadow-sm px-3 sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>

                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button onClick={async (e) => await saveDetails(e)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                            
                        </div>
                    </form>

                    { showAlert == 1 ? <SmallSucessAlert content="Event Updated!" toggle={() => setShowAlert(-1)} /> : null }
                </div>
            </div>
        </div>
    );
}
