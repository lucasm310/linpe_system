import axios from 'axios';

import https from 'https';

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: true
  }),
  baseURL: `http://localhost:5000/`,
});

export default api;
