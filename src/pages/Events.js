import axios from "axios";
import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import Event from "../components/event/Event";
import NoEvents from "../components/utils/NoEvents";
import { PUBLIC_EVENTS_ENDPOINT } from "../helpers/endpoints";
import Placeholder from "../components/utils/Placeholder";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(PUBLIC_EVENTS_ENDPOINT)
      .then((response) => {
        setEvents(response.data);
        setFetching(false);
      })
      .catch((e) => {
        setFetching(false);
      });
  }, []);

  return (
    <div>
      <Jumbotron>
        <h1>Ultimos eventos publicos</h1>
      </Jumbotron>
      {fetching && <Placeholder></Placeholder>}
      {!fetching && events.length === 0 && (
        <NoEvents text="No hay evento publicos disponibles"></NoEvents>
      )}
      <div>
        {events.map((event) => (
          <Event
            key={event.eventId}
            event={event}
            renderControls={false}
          ></Event>
        ))}
      </div>
    </div>
  );
}
