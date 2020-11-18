import express from 'express';

import user_api from './user.api';

const api: express.Router = express.Router();

api.use('/user', user_api);

export default api;