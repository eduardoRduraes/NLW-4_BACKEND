import { Router } from 'express';

import UsersController from './controller/UsersController';
import SurveysController from './controller/SurveysController';

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

router.get('/user', usersController.index);
router.post('/user', usersController.create);
//router.get('/user/:name',usersController.show);
//router.put('/user/:id',usersController.update);
//router.delete('/user/:id',usersController.delete);

router.post('/survey', surveysController.create);
router.get('/survey', surveysController.index);


export default router;

