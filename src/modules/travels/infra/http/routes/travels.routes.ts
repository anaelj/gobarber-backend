import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import { celebrate, Segments, Joi } from 'celebrate';
import TravelController from '../controllers/TravelController';
import ListTravelController from '../controllers/ListTavelController';

const travelsRouter = Router();
const travelsController = new TravelController();
const listTravelController = new ListTravelController();
travelsRouter.use(ensureAuthenticated);

travelsRouter.get('/:cpfmotorista', listTravelController.index);

travelsRouter.post(
  '/',

  travelsController.create,
);

export default travelsRouter;
