export interface User {
  /*id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  avatarUrl: string;
  birthDate: Date;
  address: Address;
  gender: String;
  nationality: String;
  rolesId: string[];*/
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean | string;
}

interface Address {
  addressLineOne: string;
  addressLineTwo: string;
  cap: string;
  city: string;
  province: string;
  country: string;
}
