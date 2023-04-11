import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";

export default function Navigation() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to={"/"}>
        Invit.App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
      <Navbar.Collapse id="main-menu">
        <Nav className="mr-auto">
          {loggedIn && (
            <Nav.Link as={NavLink} to={"/newevent"}>
              Crear Evento
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          {!loggedIn ? (
            <React.Fragment>
              <Nav.Link as={NavLink} to={"/signup"}>
                Crear Cuenta
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/signin"}>
                Iniciar Sesion
              </Nav.Link>
            </React.Fragment>
          ) : (
            <NavDropdown title={user.sub} id="menu-dropdown">
              <NavDropdown.Item as={NavLink} to={"/events"}>
                Mis Eventos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(logoutUser())}>
                Cerrar sesion
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
