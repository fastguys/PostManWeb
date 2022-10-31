import { deleteFrom, get, post, put } from './axios';

// user requests
const insertNewuser = async (payload) => {
  return post('/user', { payload });
};

const FinduserByEmail = async (payload) => {
  return get('/user/:id', { payload });
};

const UpdateUserNickname = async (payload) => {
  return put('/user/nickname/:id', { payload });
};
const UpdateUserBio = async (payload) => {
  return put('/user/bio/:id', { payload });
};

const deleteUserByEmail = async (payload) => {
  return deleteFrom('/user/:id', { payload });
};
const UpdateUserVisibility = async (payload) => {
  return put('/user/visibility/:id', { payload });
};

// message requests
const SendMessage = async (payload) => {
  return post('/message', { payload });
};

// task requests
const GetTask = async (payload) => {
  return get('/task/:id');
};
const GetTaskList = async (payload) => {
  return get('/task-list');
};

const PostTask = async (payload) => {
  return post('/task', { payload });
};

const UpdateTask = async (payload) => {
  return put('/task/:id', { payload });
};

const apis = {
  insertNewuser,
  FinduserByEmail,
  UpdateUserNickname,
  UpdateUserBio,
  SendMessage,
  GetTask,
  GetTaskList,
  PostTask,
  UpdateTask,
  deleteUserByEmail,
  UpdateUserVisibility
};

export default apis;
