import { get, post, put } from "./axios";

export const insertNewuser = async (payload) => {
  return post("/user", { payload });
};

export const FinduserByEmail = async (payload) => {
  return get("/user/:id", { payload });
};

export const UpdateUserNickname = async (payload) => {
  return put("/user/nickname/:id", {payload})
};
export const UpdateUserBio = async (payload) => {
  return put("/user/bio/:id", {payload})
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
