import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  let isSignedIn = false;
  let username = sessionStorage.getItem("username") === null ? "null" : sessionStorage.getItem("username")
  let token = sessionStorage.getItem("token") === null ? "null" : sessionStorage.getItem("token")
  if (username != "null" && token != "null") {
    isSignedIn = true
    if (location.pathname == "/") {
      return (
        <Route
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: '/home',
                state: { from: props.location }
              }}
            />
          )}
        />
      )
    }
  }
  return (
    <Route
      {...rest}
      render={props => (
        isSignedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
      )}
    />
  )
}

export const AuthenticaitonRoute = ({ component: Component, ...rest }) => {
  let username = sessionStorage.getItem("username") === null ? "null" : sessionStorage.getItem("username")
  let token = sessionStorage.getItem("token") === null ? "null" : sessionStorage.getItem("token")
  if (username != "null" && token != "null" && location.pathname == "/") {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: props.location }
            }}
          />
        )}
      />
    )
  } else {
    return (
      <Route
        {...rest}
        render={props => (
          <Component {...props} />
        )}
      />
    )
  }
}