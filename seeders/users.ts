import { v4 as UUIDv4 } from "uuid";
import { UserAttributes } from "../models/user";

export const users: UserAttributes[] = [
  {
    id: UUIDv4(),
    firstName: "John",
    lastName: "Johnson",
    email: "john11@gmail.com",
    password: "121212",
    mobile: "9002965140",
    gender: "male",
  },
  {
    id: UUIDv4(),
    firstName: "Jones",
    lastName: "Johnson",
    gender:"male",
    mobile: "8670364840",
    email: "jones10@gmail.com",
    password: "111112",
  },
];
