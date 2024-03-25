

export interface User {
  id: string | null;
  fname: string;
  lname: string;
  email: string;
  password: string;
  gender: string;
  country: string;
  hobbies: string[];
  role: "user" | "admin"; 
}
