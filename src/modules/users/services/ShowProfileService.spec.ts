// import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRespository: FakeUsersRespository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRespository = new FakeUsersRespository();
    showProfileService = new ShowProfileService(fakeUserRespository);
  });
  it('should be able show the the profile', async () => {
    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });
  it('should not be able show the the profile from non-existing user', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-existeng-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
