import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Modal,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUpForm from "../components/forms/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { registerUser, loginUser } from "../actions/authActions";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "../styles/styles.css";

export default function SignIn() {
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const register = ({ email, password, firstName, lastName }) => {
    setShowSpinner(true);
    const errors = {};
    setErrors(errors);

    if (!validator.isEmail(email)) {
      errors.email = "El correo electrónico es inválido";
    }

    if (!validator.isLength(password, { min: 8, max: 30 })) {
      errors.password = "La contraseña debe tener entre 8 y 30 caracteres";
    }

    if (validator.isEmpty(firstName)) {
      errors.firstName = "El nombre es obligatorio";
    }

    if (validator.isEmpty(lastName)) {
      errors.lastName = "El Apellido es obligatorio";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      setShowSpinner(false);
      return;
    }

    dispatch(registerUser({ email, password, firstName, lastName }))
      .then((response) => {
        setShowModal(true);
        dispatch(loginUser({ email, password }));
        setShowSpinner(false);
      })
      .catch((err) => {
        setErrors({ registerError: err.response.data.message });
        setShowSpinner(false);
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            {errors.registerError && (
              <Alert variant="danger">{errors.registerError}</Alert>
            )}
            <h3>Crear cuenta</h3>
            <hr></hr>
            <SignUpForm
              errors={errors}
              onSubmitCallback={register}
            ></SignUpForm>
            <div className="mt-4">
              <Link to={"/signin"}>
                Ya tienes una cuenta? Inicia sesión aquí.
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verifique su correo electrónico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Se ha enviado un correo electrónico de confirmación a su dirección
            de correo electrónico. Haga clic en el enlace de confirmación para
            activar su cuenta.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              history.push("/");
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {showSpinner && (
        <div className="spinner-overlay spinner-container">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
}
