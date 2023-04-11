import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PostDetails from "./pages/PostDetails";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import ConfirmarCuenta from "./pages/CheckMail";
import store from "./store";
import { Provider } from "react-redux";
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import UserPosts from "./pages/UserPosts";
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
            <Route exact path="/" component={Posts}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/post/:id" component={PostDetails}></Route>
            <Route
              exact
              path="/confirmarCuenta/:idUser"
              component={ConfirmarCuenta}
            ></Route>
            <PrivateRoute
              exact
              path="/posts"
              component={UserPosts}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/newpost"
              component={NewPost}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/editpost/:id"
              component={EditPost}
            ></PrivateRoute>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
