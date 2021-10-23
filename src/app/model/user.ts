export interface User {
  id: string;
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
  roles: Role[];
  uid: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean | string;
}

interface Role {
  authority: string,
  id: number,
  name: string,
  permissions: Permission[]
}

interface Permission {
  description: string,
  id: number,
  name: string
}

interface Address {
  addressLineOne: string;
  addressLineTwo: string;
  cap: string;
  city: string;
  province: string;
  country: string;
}
