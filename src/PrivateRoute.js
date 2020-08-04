import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, path }) => (
  <Route
    path={path}
    render={props => auth ? <Component {...props} />: <Redirect to="/" />}
  />
);
export default PrivateRoute;