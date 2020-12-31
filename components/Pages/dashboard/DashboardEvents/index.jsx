import React, { useState } from 'react';
import EventList from './EventList';
import DetailedView from './DetailedView';

export default function DashboardEvents() {
    const [detailedView, setDetailedView] = useState(-1);

    if (detailedView == -1){
        return <EventList setDetailedView={setDetailedView} />;
    } else {
        return <DetailedView detailedView={detailedView} setDetailedView={setDetailedView} />
    }
    
}
