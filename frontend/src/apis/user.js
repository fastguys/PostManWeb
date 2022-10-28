import { get, post } from "./axios";

export const insertNewuser = async (payload) => {
  return post("/user", { payload });
};

const apis = {
  insertNewuser,
};

export default apis;
