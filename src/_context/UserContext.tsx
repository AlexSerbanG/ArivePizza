import * as React from 'react';
import { UserContextValue, UserInfo } from './types';

export const UserContext = React.createContext<UserContextValue>({
  user: undefined,
  updateUser: () => {},
});

export const useUserContext = () => React.useContext(UserContext);

export const UserContextProvider: React.FC = ({ children }) => {
  const [user,setUser] = React.useState<UserInfo>();
  return (<UserContext.Provider value={{
    user,
    updateUser: setUser,
  }}>{children}</UserContext.Provider>);
};
