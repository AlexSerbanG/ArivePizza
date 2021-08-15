export type UserInfo = {
  firstName: string;
  lastName: string;
  address: Address;
  phone: string;
};

export type Address = {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  cityId: number;
};

export type City = {
  id: number;
  name: string;
}

export type UserContextValue = {
  user: UserInfo | undefined;
  updateUser: (user: UserInfo) => void;
}
