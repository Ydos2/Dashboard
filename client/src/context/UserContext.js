import React from "react";
import axios from 'axios'
import { getAllUsers, setRegisterUsers } from "../containers/AllFetch";

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

export { UserProvider, useUserState, useUserDispatch, registerUser, loginUser, signOut };

// ###########################################################

function registerUser(dispatch, login, password, name, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  setRegisterUsers(login, password, name).then(res => {
    if (res.status === 200) {
      setTimeout(() => {
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'SIGN_OUT_SUCCESS' })
  
        history.push('/login')
        return;
      }, 2000);
    } else {
      setTimeout(() => {
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'SIGN_OUT_SUCCESS' })
  
        history.push('/login')
        return;
      }, 2000);
    }
  }).catch((err) => setImmediate(() => {
    console.error(err)
    dispatch({ type: err });
    setError(true);
    setIsLoading(false);
  }))
}

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  getAllUsers(login, password).then(res => {
    if (res.status === 200) {
      setTimeout(() => {
        localStorage.setItem('id_token', 1)
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' })
  
        history.push('/app/dashboard')
        return;
      }, 2000);
    } else {
      setTimeout(() => {
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'SIGN_OUT_SUCCESS' })
  
        history.push('/login')
        return;
      }, 2000);
    }
  }).catch((err) => setImmediate(() => {
    setTimeout(() => {
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'SIGN_OUT_SUCCESS' })

      history.push('/login')
      return;
    }, 2000);
    /*console.error(err)
    dispatch({ type: err });
    setError(true);
    setIsLoading(false);*/
  }))
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
