import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

let fakeUserRespository: FakeUsersRespository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {

  beforeEach(() => {
    fakeUserRespository = new FakeUsersRespository();
    fakeStorageProvider = new FakeStorageProvider();
  
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRespository,
      fakeStorageProvider,
    );
  })
  it('should be able to update avatar', async () => {

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
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
      await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'teste.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
