import React, { useState } from 'react';
import EventList from './EventList';
import SignUpList from './SignUpList';

export default function DashboardEvents() {
    const [detailedView, setDetailedView] = useState(-1);

    if (detailedView == -1){
        return <EventList setDetailedView={setDetailedView} />;
    } else {
        return <SignUpList detailedView={detailedView} setDetailedView={setDetailedView} />
    }
    
    return null;
}
