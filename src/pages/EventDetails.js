import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { EVENT_DETAILS_ENDPOINT } from "../helpers/endpoints";
import axios from "axios";
import { Card, Jumbotron, Button } from "react-bootstrap";
import moment from "moment";
import { Prism as SystaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { downloadTextAsFile } from "../helpers/helpers";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${EVENT_DETAILS_ENDPOINT}/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((e) => {
        history.push("/");
      });
  }, [id, history]);

  return (
    <div className="pb-4">
      {event && (
        <React.Fragment>
          <Jumbotron>
            <h1>{event.title} </h1>
            <p>
              Creado por {event.user.firstName},{" "}
              {moment(event.createdAt).fromNow()}
            </p>
          </Jumbotron>

          <Card>
            <Card.Header>
              <Button
                variant="primary"
                className="mr-2"
                size="sm"
                onClick={() => {
                  downloadTextAsFile(event.eventId, event.content);
                }}
              >
                Descargar
              </Button>
              <CopyToClipboard
                onCopy={() => {
                  toast.info("Copiado al portapapeles", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 2000,
                  });
                }}
                text={event.content}
              >
                <Button variant="primary" size="sm" onClick={() => {}}>
                  Copiar al portapapeles
                </Button>
              </CopyToClipboard>
            </Card.Header>
            <Card.Body>
              <SystaxHighlighter showLineNumbers={true}>
                {event.content}
              </SystaxHighlighter>
            </Card.Body>
          </Card>
        </React.Fragment>
      )}
    </div>
  );
}
