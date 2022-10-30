import { get, post } from "./axios";

export const insertNewuser = async (payload) => {
  return post("/user", { payload });
};

export const FinduserByEmail = async (payload) => {
  return get("/user/:id", { payload });
};

export const SendMessage = async (payload) => {
  return post("/message", { payload });
};

const apis = {
  insertNewuser,
  FinduserByEmail,
  SendMessage,
};

export default apis;
