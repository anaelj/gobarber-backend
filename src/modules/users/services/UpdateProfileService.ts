import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  transportadora_id: string;
  admin_flex: string;
  admin_transportadora: string;
  cpf: string;  
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
    transportadora_id,
    admin_flex,
    admin_transportadora,
    cpf
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

//    console.log(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id != user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;
    user.admin_flex = admin_flex;
    user.transportadora_id = transportadora_id;
    user.admin_transportadora = admin_transportadora;
    user.cpf = cpf;

/*    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }
*/
    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError('Old password does not math.');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
