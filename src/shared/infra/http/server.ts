import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import { errors } from 'celebrate';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(express.json());

app.use(rateLimiter);

app.use(cors());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        statu: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🥶 server started on port 3333');
});
