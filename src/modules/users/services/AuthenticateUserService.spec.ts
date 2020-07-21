import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existeing user', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
