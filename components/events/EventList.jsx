import React from 'react';
import Card from './card';

export default function EventList(props) {
    return (
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            {props.upComingEvents.map((item, i) => {
                return <Card key={i} name={item.name} description={item.description} iconURL={item.iconURL} />
            })}
        </div>
    )
}
