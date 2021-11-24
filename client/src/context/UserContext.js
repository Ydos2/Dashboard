import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

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
  setError(false);
  setIsLoading(true);

  const response = await fetch('http://locahost:8080/login?mail=' + login + '&pass=' + password);
  if (response.ok) {
    // Store response body normally
    return;
  }
  if (response.status === 400) {
    // If it's an error
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  } else if (response.status === 200) {
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 2000);
  }
}

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  //doRequest(dispatch, login, password, history, setIsLoading, setError);

  var request = new XMLHttpRequest();
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
  
  request.open('GET', 'http://locahost:8080/login?mail=' + login + '&pass=' + password);
  request.send();
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
