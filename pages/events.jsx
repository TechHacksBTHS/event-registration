import React, { useEffect, useState } from "react";
import EventList from '../components/events/EventList';
import fire from "../config/fire-config";

const events = () => {
    const [upComingEvents, setUpComingEvents] = useState([]); 

    useEffect(() => {
        fire.firestore().collection("events").onSnapshot(snap => {
            const events = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUpComingEvents(events);
        })
    }, []);

    return (
        <div className="container px-4 md:px-10 lg:px-16 py-6">
            <h3 className="text-4xl mb-5">Upcoming Events</h3>
            <EventList upComingEvents={upComingEvents} />
        </div>
    );
}

export default events;