import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import NewEventForm from "../components/forms/NewEventForm";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { useHistory, useParams } from "react-router-dom";
import { exposures } from "../helpers/exposures";
import {
  UPDATE_EVENT_ENDPOINT,
  EVENT_DETAILS_ENDPOINT,
} from "../helpers/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserEvents } from "../actions/eventActions";

export default function EditEvent() {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [event, setEvent] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

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

  const editEvent = async ({ title, content, expirationTime, exposureId }) => {
    const errors = {};
    setErrors(errors);

    if (validator.isEmpty(title)) {
      errors.title = "El titulo es obligatorio";
    }

    if (validator.isEmpty(content)) {
      errors.content = "El contenido es obligatorio";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    expirationTime =
      parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime;

    try {
      const response = await axios.put(
        `${UPDATE_EVENT_ENDPOINT}/${event.eventId}`,
        { title, content, expirationTime, exposureId }
      );
      await dispatch(getUserEvents());
      toast.info("El evento se ha modificado", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
      history.push(`/event/${response.data.eventId}`);
    } catch (err) {
      setErrors({ editevent: err.response.data.message });
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm="12" lg={{ span: 10, offset: 1 }}>
          <Card body>
            {errors.editevent && <Alert variant="danger">{errors.auth}</Alert>}

            <h3>Editar evento</h3>
            <hr></hr>
            {event && (
              <NewEventForm
                errors={errors}
                onSubmitCallback={editEvent}
                pTitle={event.title}
                pContent={event.content}
                pExposureId={event.exposure.id}
                textButton="Editar Evento"
              ></NewEventForm>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
