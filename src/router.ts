import express from 'express';

import api from './api/api';

const router: express.Router = express.Router();

router.use('/api', api);

router.get('*', (req: express.Request, res: express.Response) => {
    res.send("404");
});

export default router;