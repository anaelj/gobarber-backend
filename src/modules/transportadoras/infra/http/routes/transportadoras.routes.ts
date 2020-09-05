import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TransportadorasController from '../controllers/TransportadorasController';
import TransportadoraAvatarController from '../controllers/TransportadoraAvatarController';

const transportadorasRouter = Router();
const upload = multer(uploadConfig.multer);
const transportadorasController = new TransportadorasController();
const transportadoraAvatarController = new TransportadoraAvatarController();

transportadorasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      telefone: Joi.string().required(),
      contato: Joi.string().required(),
    },
  }),
  transportadorasController.create,
);

transportadorasRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  transportadoraAvatarController.update,
);

export default transportadorasRouter;
