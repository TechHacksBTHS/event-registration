import React from 'react';
import Card from './Card';

export default function EventList(props) {
    return (
        <div className="flex flex-wrap overflow-hidden">
            {props.upComingEvents.map((item, i) => {
                return <Card key={i} name={item.name} description={item.description} iconURL={item.iconURL} />
            })}
        </div>
    )
}
