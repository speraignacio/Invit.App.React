import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Events from "./pages/Events";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import ConfirmarCuenta from "./pages/CheckMail";
import store from "./store";
import { Provider } from "react-redux";
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import UserEvents from "./pages/UserEvents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";

//moment config
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

checkForToken();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation></Navigation>
        </div>
        <Container>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Events}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/event/:id" component={EventDetails}></Route>
            <Route
              exact
              path="/confirmarCuenta/:idUser"
              component={ConfirmarCuenta}
            ></Route>
            <PrivateRoute
              exact
              path="/events"
              component={UserEvents}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/newevent"
              component={NewEvent}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/editevent/:id"
              component={EditEvent}
            ></PrivateRoute>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
