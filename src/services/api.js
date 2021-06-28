import axios from "axios";

import https from "https";

const { REACT_APP_API } = process.env;

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: true,
  }),
  baseURL: `${REACT_APP_API}/`,
});

export default api;
