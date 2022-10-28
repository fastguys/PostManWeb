import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 120000,
  withCredentials: true
});

const axiosConfig = {
  withCredentials: true
};

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, Object.assign(axiosConfig)).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
