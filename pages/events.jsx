import React, { useEffect, useState, useContext } from "react";
import EventList from '../components/Pages/events/EventList';
import { SuccessAlert } from "../components/Alerts/SuccessAlert";
import fire from "../config/fire-config";
import { RegistrationAlertContext } from "../contexts/RegistrationAlertContext";

const renderAlert = () => {
    const { registrationAlert } = useContext(RegistrationAlertContext);
    if (registrationAlert == null){
        return null;
    }

    if (registrationAlert.alert === "success"){
        return <SuccessAlert name={registrationAlert.content} />
    }

    return null;
}

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
            { renderAlert() }
            <EventList upComingEvents={upComingEvents} />
        </div>
    );
}

export default events;