import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  transportadora_id?: string;
  admin_flex: string;
  admin_transportadora: string;
  cpf: string;

}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    transportadora_id,
    admin_flex,
    admin_transportadora,
    cpf
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    //console.log(name);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      transportadora_id,
      admin_flex,
      admin_transportadora,
      cpf
    });

    await this.cacheProvider.invalidadePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
