import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, transportadora_id } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      transportadora_id,
    });

    delete user.password;

    return response.json(classToClass(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
  
    const user_id = request.params.user_id; // request.user.id;

    const showUser = container.resolve(ShowProfileService);

    const user = await showUser.execute({ user_id });

//    delete user.password;

    return response.json(classToClass(user));
  }


  public async index(request: Request, response: Response): Promise<Response> {
    const {  user_id } = request.params;
    //    const { month, year } = request.query; quando for filtrar por email e nome precisa passar esses dados

//    console.log(request.params);

    const listUsersServiceService = container.resolve(
      ListUsersService,
    );

    const users = await listUsersServiceService.execute ({
      user_id,
    });

    return response.json(classToClass(users));
  }

   
}
