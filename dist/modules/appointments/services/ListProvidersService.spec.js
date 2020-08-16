"use strict";

require("reflect-metadata");

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRespository;
let listProvidersService;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRespository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProvidersService = new _ListProvidersService.default(fakeUserRespository, fakeCacheProvider);
  });
  it('should be able show the to list the provider', async () => {
    const user2 = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user1 = await fakeUserRespository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456'
    });
    const loggedUser = await fakeUserRespository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456'
    });
    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user2, user1]);
  });
});