import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import transportadorasRouter from '@modules/transportadoras/infra/http/routes/transportadoras.routes';
import travelsRouter from '@modules/travels/infra/http/routes/travels.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // use serve pra qualquer tipo de rota (post, get etc )
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/transportadoras', transportadorasRouter);
routes.use('/travels', travelsRouter);

export default routes;
