import React from "react";
import EventList from '../components/events/EventList';

const upComingEvents = [
    {
        name: "Technight 2020",
        type: "Hackathon",
        iconURL: "/images/042-keyboard.svg",
        description: "Join us for the best hackathon yet!"
    },
    {
        name: "Technight 2021",
        type: "Hackathon",
        iconURL: "/images/001-cyber security.svg",
        description: "Join us for the best hackathon yet!"
    }
];
 
const events = () => {

    return (
        <div className="container px-4 md:px-10 lg:px-16 py-6">
            <h3 className="text-4xl mb-5">Upcoming Events</h3>
            <EventList upComingEvents={upComingEvents} />
        </div>
    );
}

export default events;