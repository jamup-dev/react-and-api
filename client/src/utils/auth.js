import React, { createContext, useContext, useEffect, useReducer } from "react";

const defaultSession = {
  isAuthenticated: false,
  user: null,
  token: null
};

const AUTH_LOCALSTORAGE_KEY = "auth-app-ls-key";

function sessionReducer(state, action) {
  if (action.type === "LOGIN") {
    return {
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload.token
    };
  }
  if (action.type === "LOGOUT") {
    return {
      isAuthenticated: false,
      user: null,
      token: null
    };
  }

  return state;
}

export function useSetupSession() {
  const [session, dispatch] = useReducer(sessionReducer, null, () => {
    // retrieve from localStorage
    const possibleSession = window.localStorage.getItem(AUTH_LOCALSTORAGE_KEY);
    try {
      const storedSession = JSON.parse(possibleSession);
      if (storedSession == null) {
        return defaultSession;
      }
      return storedSession;
    } catch (e) {
      return defaultSession;
    }
  });

  // persist changes in localstorage
  useEffect(() => {
    // just store it
    window.localStorage.setItem(AUTH_LOCALSTORAGE_KEY, JSON.stringify(session));
  }, [session]);

  return [session, dispatch];
}

export const sessionContext = createContext();
export const sessionDispatchContext = createContext();

export function useSession() {
  return useContext(sessionContext);
}

export function useSessionDispatch() {
  return useContext(sessionDispatchContext);
}

export function SessionProvider({ children }) {
  const [session, dispatch] = useSetupSession();
  return (
    <sessionContext.Provider value={session}>
      <sessionDispatchContext.Provider value={dispatch}>
        {children}
      </sessionDispatchContext.Provider>
    </sessionContext.Provider>
  );
}
