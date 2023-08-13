import { v4 as UUIDv4 } from "uuid";
import { RoleAttributes } from "../models/role";

export const roles: RoleAttributes[] = [
  {
    id: UUIDv4(),
    title: "hr",
  },
  {
    id: UUIDv4(),
    title: "developer",
  },

  {
    id: UUIDv4(),
    title: "interviewee",
  },
  {
    id: UUIDv4(),
    title: "interviewer",
  },
];
