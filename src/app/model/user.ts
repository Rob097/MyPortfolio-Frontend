export class User {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  avatarUrl: string;
  birthDate: Date;
  address: Address | undefined;
  gender: String;
  nationality: String;
  roles: Role[];
  uid: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean | string;

  constructor(){
    this.id = "";
    this.username = "";
    this.name = "";
    this.surname = "";
    this.email = "";
    this.password = "";
    this.phone = "";
    this.avatarUrl = "";
    this.birthDate = new Date();
    this.address = undefined;
    this.gender = "";
    this.nationality = "";
    this.roles = [];
    this.uid = "";
    this.displayName = "";
    this.photoURL = "";
    this.emailVerified = "";
  }

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
