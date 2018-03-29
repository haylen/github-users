import axios from 'axios';

const MAIN_URL = 'https://api.github.com';

export const getUsers = (since) => {
  const attrs = since ? `?since=${since}` : '';
  return axios.get(`${MAIN_URL}/users${attrs}`);
};

export const getUser = (login) => (
  axios.get(`${MAIN_URL}/users/${login}`)
);
