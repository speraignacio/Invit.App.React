import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import Event from "../components/event/Event";
import Placeholder from "../components/utils/Placeholder";
import { useSelector, useDispatch } from "react-redux";
import NoEvents from "../components/utils/NoEvents";
import { getUserEvents } from "../actions/eventActions";
import { toast } from "react-toastify";

export default function UserEvents() {
  const [fetching, setFetching] = useState(false);
  const fetched = useSelector((state) => state.events.fetched);
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchedEvents() {
      if (!fetched) {
        try {
          setFetching(true);
          await dispatch(getUserEvents());
          setFetching(false);
        } catch (err) {
          toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
          });
        }
      }
    }
    fetchedEvents();
  }, [dispatch, fetched]);

  return (
    <div>
      <Jumbotron>
        <h1>Mis eventos</h1>
      </Jumbotron>
      {fetching && <Placeholder></Placeholder>}
      {!fetching && events.length === 0 && (
        <NoEvents text="No hay eventos privados disponibles"></NoEvents>
      )}
      <div>
        {events.map((event) => (
          <Event
            key={events.eventId}
            event={event}
            renderControls={true}
          ></Event>
        ))}
      </div>
    </div>
  );
}
