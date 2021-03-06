// import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRespository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password', async () => {
    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: '123123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the the profile from non-existing user', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non-existeng-user-id',
        name: 'teste',
        email: 'teste@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUserRespository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
