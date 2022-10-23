export const insertNewuser = (payload) => { 
  return post("/user", payload);
}

const apis = {
  insertNewuser
}

export default apis