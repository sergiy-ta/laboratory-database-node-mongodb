import express from 'express';

import user_api from './user.api';
import project_api from './project.api';
import company_api from './company.api';
import budget_api from './budget.api';

const api: express.Router = express.Router();

api.use('/user', user_api);
api.use('/project', project_api);
api.use('/company', company_api);
api.use('/budget', budget_api);

export default api;