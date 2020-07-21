import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        statu: 'error',
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: err.message, // 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🥶 server started on port 3333');
});
