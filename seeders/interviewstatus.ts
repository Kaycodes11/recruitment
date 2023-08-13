import { v4 as uuidV4 } from "uuid";

export const interviewStatus = [
  {
    id: uuidV4(),
    type: "1",
    title: "active",
  },

  {
    id: uuidV4(),
    type: "2",
    title: "request for schedule change",
  },

  {
    id: uuidV4(),
    type: "3",
    title: "done",
  },

  {
    id: uuidV4(),
    type: "5",
    title: "absent",
  },

  {
    id: uuidV4(),
    type: "6",
    title: "none",
  },
];
