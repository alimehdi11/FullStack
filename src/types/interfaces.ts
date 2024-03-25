
export interface Input {
  label: string;
  type: string;
  name: string;
}

export const inputs: Input[] = [
  {
    label: "First Name",
    type: "text",
    name: "fname"
  },
  {
    label: "Last Name",
    type: "text",
    name: "lname"
  },
  {
    label: "Email",
    type: "email",
    name: "email"
  },
  {
    label: "Password",
    type: "password",
    name: "password"
  }
];


type Rating = {
  rate:number;
  count:number;
  stars:number
}

export interface Product {
  id:string;
  title:string;
  price:number;
  description:string;
  category:string;
  image:string;
  rating:Rating;
}