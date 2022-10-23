import axios from 'axios';

export const insertNewuser = async (payload) => { 
  const {response} =  await axios.post("http://localhost:3001/api", payload);
  return response;
}

const apis = {
  insertNewuser
}

export default apis