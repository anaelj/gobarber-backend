import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import { celebrate, Segments, Joi } from 'celebrate';
import DriverController from '../controllers/DriverController';
import ListDriverController from '../controllers/ListDriverController';

const DriversRouter = Router();
const DriversController = new DriverController();
const listDriverController = new ListDriverController();
DriversRouter.use(ensureAuthenticated);

DriversRouter.get('/:name/:cpf', listDriverController.index);

DriversRouter.post('/', DriversController.create);

export default DriversRouter;
