import React from "react";
import { fetch as nfetch } from 'node-fetch';
import axios from 'axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

const request = require('request');

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

async function doRequest(dispatch, login, password, history, setIsLoading, setError) {
  /*var response = await fetch("http://localhost:8080/login?mail=Cotax61@gmail.com&pass=awaw", {
    method: 'get',
  })*/

  let status = 200;
  try {
      let rsp = await axios.get("http://localhost:8080/login?mail=Cotax61@gmail.com&pass=awaw");
      status = rsp.status;
  } catch (err) {
      status = err.response.status;
  }

  dispatch({ type: status });
  setError(true);
  setIsLoading(false);
  if (status === 304) {
    dispatch({ type: status });
    setError(true);
    setIsLoading(false);
  
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
      return;
    }, 2000);
  } else {
    // If it's an error
    dispatch({ type: status });
    setError(true);
    setIsLoading(false);
    return;
  }
}

function fetchdata() {
  return fetch("http://localhost:8080/login?mail=Cotax61@gmail.com&pass=awaw").then(function(response) {
      return response.json();
  }).then(function(json) {
      return json;
  });
}

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  doRequest(dispatch, login, password, history, setIsLoading, setError);
  
  /*fetch("http://localhost:8080/api").then(result => {
      console.log(result.status);
      if (result.status === 304) {
        setTimeout(() => {
          localStorage.setItem('id_token', 1)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })
    
          history.push('/app/dashboard')
          return;
        }, 2000);
      } else {
        // If it's an error
        dispatch({ type: result.status });
        setError(true);
        setIsLoading(false);
        return;
      }
      return (result.json())
    }).then(json => {
        console.log(json);
    });*/

  //const response =  fetch('http://localhost:8080/login?mail=' + login + '&pass=' + password, {method: 'GET'});

  /*var sr;
  fetch('http://localhost:8080/login?mail=Cotax61@gmail.com&pass=awaw').then(function(response) {
    if(response.statusCode === 304) {
      return response.blob();
  }
  throw new Error('Network response was not ok.');
  }).then(function(myBlob) { 
    dispatch({ type: 42 });
    setError(true);
    setIsLoading(false);
  }).catch(function(error) {
    dispatch({ type: error.statusCode });
    setError(true);
    setIsLoading(false);
  });*/

  /*fetchdata().then(function(result) {
    result.json().then(function(json) {
        console.log(json);
    });
    console.log(response.statusCode);
    
    if (response.statusCode === 200) {
      dispatch({ type: response.statusCode });
      setError(true);
      setIsLoading(false);

      setTimeout(() => {
        localStorage.setItem('id_token', 1)
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' })

        history.push('/app/dashboard')
      }, 2000);
    } else {
      // If it's an error
      dispatch({ type: response.statusCode });
      setError(true);
      setIsLoading(false);
    }
  });*/

  
  /*var request = new XMLHttpRequest();
  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }
  
    if (request.status === 200) {
      setTimeout(() => {
        localStorage.setItem('id_token', 1)
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' })
  
        history.push('/app/dashboard')
      }, 2000);
    } else {
      dispatch({ type: request.status });
      setError(true);
      setIsLoading(false);
    }
  };
  
  request.open('GET', 'http://localhost:8080/login?mail=' + login + '&pass=' + password);
  request.send();*/
  //if (!!login && !!password) {
  /*if (status == '200') {
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 2000);
  } else {
    // If it's an error
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }*/
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
