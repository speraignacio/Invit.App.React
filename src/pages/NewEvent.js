import React, { useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import NewEventForm from "../components/forms/NewEventForm";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { useHistory } from "react-router-dom";
import { exposures } from "../helpers/exposures";
import { CREATE_EVENT_ENDPOINT } from "../helpers/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserEvents } from "../actions/eventActions";

export default function NewEvent() {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const createEvent = async ({
    title,
    content,
    expirationTime,
    exposureId,
  }) => {
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
      const response = await axios.post(CREATE_EVENT_ENDPOINT, {
        title,
        content,
        expirationTime,
        exposureId,
      });
      await dispatch(getUserEvents());
      toast.info("El evento se ha creado", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
      history.push(`/event/${response.data.eventId}`);
    } catch (err) {
      setErrors({ newevent: err.response.data.message });
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm="12" lg={{ span: 10, offset: 1 }}>
          <Card body>
            {errors.newevent && <Alert variant="danger">{errors.auth}</Alert>}

            <h3>Crear evento</h3>
            <hr></hr>
            <NewEventForm
              errors={errors}
              onSubmitCallback={createEvent}
            ></NewEventForm>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
