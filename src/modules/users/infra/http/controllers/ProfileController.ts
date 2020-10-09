import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;

//    console.log(user_id);

    const { name, email, old_password, password, transportadora_id, admin_flex, admin_transportadora, cpf } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
      transportadora_id, 
      admin_flex, 
      admin_transportadora, 
      cpf
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
