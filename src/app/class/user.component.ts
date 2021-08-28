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
  address: Address;
  gender: String;
  nationality: String;
  rolesId: string[] = [];

  constructor(
    id: string,
    username: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    phone: string,
    avatarUrl: string,
    birthDate: Date,
    address: Address,
    gender: string,
    nationality: string,
    rolesId: string[]
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.avatarUrl = avatarUrl;
    this.birthDate = birthDate;
    this.address = address;
    this.gender = gender;
    this.nationality = nationality;
    this.rolesId = rolesId;
  }
}

class Address {
  addressLineOne: string;
  addressLineTwo: string;
  cap: string;
  city: string;
  province: string;
  country: string;

  constructor(
    addressLineOne: string,
    addressLineTwo: string,
    cap: string,
    city: string,
    province: string,
    country: string
  ) {
    this.addressLineOne = addressLineOne;
    this.addressLineTwo = addressLineTwo;
    this.cap = cap;
    this.city = city;
    this.province = province;
    this.country = country;
  }
}
