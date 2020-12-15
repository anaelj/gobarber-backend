import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import ITransportadorasRepository from '@modules/transportadoras/repositories/ITransportadorasRepository';
import TransportadorasRepository from '@modules/transportadoras/infra/typeorm/repositories/TransportadorasRepository';

import ITravelsRepository from '@modules/travels/repositories/ITravelsRepository';
import TravelsRepository from '@modules/travels/infra/typeorm/repositories/TravelsRepository';

import IDriversRepository from '@modules/drivers/repositories/IDriversRepository';
import DriversRepository from '@modules/drivers/infra/typeorm/repositories/DriversRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRespository';

container.registerSingleton<ITransportadorasRepository>(
  'TransportadorasRepository',
  TransportadorasRepository,
);

container.registerSingleton<ITravelsRepository>(
  'TravelsRepository',
  TravelsRepository,
);

container.registerSingleton<IDriversRepository>(
  'DriversRepository',
  DriversRepository,
);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
