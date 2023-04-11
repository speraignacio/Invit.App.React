import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import { exposures } from "../../helpers/exposures";
import DeleteEventButton from "./buttons/DeleteEventButton";

export default function Event({ event, renderControls }) {
  return (
    <Card className="mb-4">
      {renderControls && (
        <Card.Header className="d-flex justify-content-between">
          <div>
            <Badge variant="secondary" className="mr-2">
              {event.exposure.type}
            </Badge>
            {event.expired && event.exposure.id === exposures.PUBLIC && (
              <Badge variant="danger" className="mr-2">
                Expiro
              </Badge>
            )}
          </div>
          <div>
            <Button
              variant="primary"
              size="sm"
              className="mr-2"
              as={NavLink}
              to={`editevent/${event.eventId}`}
            >
              Editar
            </Button>
            <DeleteEventButton
              eventId={event.eventId}
              title={event.title}
            ></DeleteEventButton>
          </div>
        </Card.Header>
      )}
      <Card.Body>
        <Card.Title>
          <Link to={`/event/${event.eventId}`}>{event.title}</Link>
        </Card.Title>
        <Card.Text>
          Creado por {event.user.firstName}, {moment(event.createdAt).fromNow()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
