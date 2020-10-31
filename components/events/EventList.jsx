import React from 'react';
import Card from './Card';

export default function EventList(props) {
    return (
        <div className="flex flex-wrap overflow-hidden">
            {props.upComingEvents.map((item, i) => {
                return <Card key={i} id={i} name={item.name} type={item.type} iconURL={item.iconURL} description={item.description} />
            })}
        </div>
    )
}
