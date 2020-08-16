"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRespository;
let showProfileService;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRespository = new _FakeUsersRepository.default();
    showProfileService = new _ShowProfileService.default(fakeUserRespository);
  });
  it('should be able show the the profile', async () => {
    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const profile = await showProfileService.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });
  it('should not be able show the the profile from non-existing user', async () => {
    expect(showProfileService.execute({
      user_id: 'non-existeng-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});