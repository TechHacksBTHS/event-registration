import EventList from '../components/events/EventList';

const upComingEvents = [
    {
        name: "Technight 2020",
        description: "Flagship Hackathon",
        iconURL: "/images/001-cyber security.svg"
    },
    {
        name: "Technight 2021",
        description: "Flagship Hackathon",
        iconURL: "/images/001-cyber security.svg"
    }
];

const events = () => {
    return (
        <div className="container m-3 md:m-10">
            <h3 className="text-4xl mb-5">Upcoming Events</h3>
            <EventList upComingEvents={upComingEvents} />
        </div>
    );
}

export default events;