import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { EventRegistrationModal } from '../../components/Pages/events/EventRegistrationModal';
import fire from "../../config/fire-config";

export default function EventModal({ eventId }) {
    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        router.prefetch("/events");

        fire.firestore().collection("events").onSnapshot(snap => {
            snap.docs.forEach(doc => {
                if (doc.id == eventId){
                    setName(doc.data().name);
                    setDescription(doc.data().description);
                }
            });
        });

    }, []);

  return (
    <>
        <EventRegistrationModal id={eventId} name={name} description={description} />
    </>
  );
}

export function getStaticProps({ params: { eventId }}) {
    return { props: { eventId: eventId }}
}

export function getStaticPaths(){
    return {
        paths: [],
        fallback: true,
    }
}