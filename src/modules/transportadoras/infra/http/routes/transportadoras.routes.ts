import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TransportadoraAvatarController from '../controllers/TransportadoraAvatarController';
import TransportadorasController from '../controllers/TransportadorasController';
import ProviderListTransportadorasController from '../controllers/ProviderListTransportadorasController';

const transportadorasRouter = Router();
const upload = multer(uploadConfig.multer);
const transportadorasController = new TransportadorasController();
const transportadoraAvatarController = new TransportadoraAvatarController();
const providerListTransportadorasController = new ProviderListTransportadorasController();

transportadorasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      telefone: Joi.string().required(),
      contato: Joi.string().required(),
      status: Joi.string().required(),
    },
  }),
  transportadorasController.create,
);

transportadorasRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      telefone: Joi.string().required(),
      contato: Joi.string().required(),
      status: Joi.string().required(),
    },
  }),
  transportadorasController.update,
);

transportadorasRouter.get(
  '/:transportadora_id',
  celebrate({
    [Segments.PARAMS]: {
      transportadora_id: Joi.string().uuid().required(),
    },
  }),
  providerListTransportadorasController.index,
);

transportadorasRouter.get(
  '/show/:transportadora_id',
  celebrate({
    [Segments.PARAMS]: {
      transportadora_id: Joi.string().uuid().required(),
    },
  }),
  providerListTransportadorasController.show,
);

transportadorasRouter.patch(
  '/avatar/:id',
  //  ensureAuthenticated,
  upload.single('avatar'),
  transportadoraAvatarController.update,
);

export default transportadorasRouter;
