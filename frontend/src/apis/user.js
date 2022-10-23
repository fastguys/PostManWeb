import {post} from './axios';

export const insertNewuser = async (payload) => { 
  console.log(payload);
  return post("/user", {payload});
}

const apis = {
  insertNewuser
}

export default apis