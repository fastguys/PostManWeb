import { get, post } from './axios';

export const insertNewuser = async (payload) => {
  return post('/user', { payload });
};

export const FinduserByEmail = async (payload) => {
  return get('/:id', { payload });
};

const apis = {
  insertNewuser,
  FinduserByEmail
};

export default apis;
