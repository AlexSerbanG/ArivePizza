export type UserInfo = {
  name: string;
  address: Address;
  phone: string;
};

export type Address = {
  streetName: string;
  houseNumber: string;
  postalCode: string;
  cityId: number;
};

export type City = {
  id: number;
  name: string;
};

export type UserContextValue = {
  user: UserInfo;
  updateUser: (user: UserInfo) => Promise<void>;
  isValid: boolean;
};
