import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import TravelController from '../controllers/TravelController';

const travelsRouter = Router();
const travelsController = new TravelController();

travelsRouter.use(ensureAuthenticated);

travelsRouter.get('/travels/:cpfmotorista', travelsController.create);

travelsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      transportadora_id: Joi.string().uuid().required(),
    },
  }),
  travelsController.create,
);

export default travelsRouter;
