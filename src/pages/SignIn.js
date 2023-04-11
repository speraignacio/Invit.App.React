import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInForm from "../components/forms/SignInForm";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { loginUser } from "../actions/authActions";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const login = ({ email, password }) => {
    const errors = {};
    setErrors(errors);

    if (!validator.isEmail(email)) {
      errors.email = "El correo electrónico es inválido";
    }

    if (validator.isEmpty(password)) {
      errors.password = "La contraseña no puede estar vacía";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    dispatch(loginUser({ email, password }))
      .then((response) => {})
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrors({ auth: error.response.data.error });
        } else {
          setErrors({
            auth: "Ha ocurrido un error. Por favor, inténtelo de nuevo.",
          });
        }
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            {errors.auth && <Alert variant="danger">{errors.auth}</Alert>}
            <h3>Iniciar sesión</h3>
            <hr></hr>
            <SignInForm errors={errors} onSubmitCallback={login}></SignInForm>
            <div className="mt-4">
              <Link to={"/signup"}>
                ¿No tienes una cuenta? Regístrate aquí.
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
