import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRespository,
      fakeStorageProvider,
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'teste.jpg',
    });

    expect(user.avatar).toBe('teste.jpg');
  });
  it('should delete old avatar when updating new one', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeStorageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRespository,
      fakeStorageProvider,
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'teste.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'teste2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('teste.jpg');
    expect(user.avatar).toBe('teste2.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRespository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'teste.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
