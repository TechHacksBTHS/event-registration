import React from 'react';
import Card from './Card';

export default function EventList(props) {
    return (
        <div className="flex flex-wrap overflow-hidden">
            {props.upComingEvents.map((item) => {
                return <Card key={item.id} id={item.id} name={item.name} type={item.type} iconURL={item.iconURL} description={item.description} />
            })}
        </div>
    )
}
