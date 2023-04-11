import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PrivateRoute({ component: Component, ...rest }) {

    const loggedIn = useSelector(state => state.auth.loggedIn);

    return (
        <Route 
        {...rest}
        render={ 
            props => loggedIn === true ? 
            (<Component {...props}></Component>) 
            : (<Redirect to="/signin"></Redirect>)
        }
        ></Route>
    );
}
