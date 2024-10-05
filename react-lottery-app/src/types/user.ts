export class User {
  id: number;
  name: string;
  dob: Date;
  email: string;
  phone: string;

  constructor(name: string, dob: Date, email: string, phone: string) {
    this.id = Date.now();
    this.name = name;
    this.dob = dob;
    this.email = email;
    this.phone = phone;
  }
}
