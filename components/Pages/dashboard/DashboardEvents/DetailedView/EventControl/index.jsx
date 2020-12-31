import { Input, Label, Select, Textarea, Button } from '@windmill/react-ui'
import { enUS } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import { DatePicker } from 'react-nice-dates'
import Firebase from 'firebase/app';
import 'react-nice-dates/build/style.css'

import Axios from 'axios';

export default function EventControl({ uid }) {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [sponsors, setSponsors] = useState(0);
    const [date, setDate] = useState(new Date());

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

    const saveDetails = async () => {
        const timestamp = Firebase.firestore.Timestamp.fromDate(date);
        await Axios.put("/api/events/" + uid, {name, type, description, date: timestamp, sponsors, status});
        // await fetchEventDetails();
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
                                    <Label>
                                        <span>Event Name</span>
                                        <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)}/>
                                    </Label>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <Label>
                                        <span>Event Type</span>
                                        <Select className="mt-1" onChange={(e) => setType(e.target.value)} value={type}>
                                            <option value="hackathon">Hackathon</option>
                                        </Select>
                                    </Label>
                                </div>

                                <div className="col-span-6">
                                    <Label>
                                        <span>Event Description</span>
                                        <Textarea className="mt-1" rows="3" placeholder="Enter some event descriptions." value={description} onChange={(e) => setDescription(e.target.value)}/>
                                    </Label>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <Label>
                                        <span>Event Date</span>
                                        <DatePicker date={date} onDateChange={setDate} locale={enUS} format='MM/dd/yyyy HH:mm'>
                                            {({ inputProps }) => <Input className="mt-1" {...inputProps}/>}
                                        </DatePicker>
                                    </Label>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <Label>
                                        <span>Status</span>
                                        <Select className="mt-1" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="In Work">In Work</option>
                                            <option value="Completed">Completed</option>
                                        </Select>
                                    </Label>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <Label>
                                        <span>Sponsors</span>
                                        <Input className="mt-1" value={sponsors} onChange={(e) => setSponsors(e.target.value)} />
                                    </Label>
                                </div>

                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <Button onClick={() => saveDetails()}>Save</Button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
