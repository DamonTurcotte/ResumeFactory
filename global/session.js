import { createContext, useContext } from 'react';
import { useStorageState } from "./store";

const AuthContext = createContext();

export function SessionProvider({children}) {
  const [[loadingSession, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        session,
        loadingSession,
        setProfile: null,
        setData: null,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }
  return context;
}
