import * as React from "react";
import { UserContextValue, UserInfo } from "./types";

export const defaultUser: UserInfo = {
  name: "",
  address: {
    cityId: -1,
    postalCode: "",
    streetName: "",
    houseNumber: "",
  },
  phone: "",
};

export const UserContext = React.createContext<UserContextValue>({
  user: defaultUser,
  updateUser: () => Promise.resolve(),
  isValid: false,
});

export const useUserContext = () => React.useContext(UserContext);

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<UserInfo>(defaultUser);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{
        user,
        isValid,
        updateUser: async (user) => {
          setUser(user);
          setIsValid(true);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
