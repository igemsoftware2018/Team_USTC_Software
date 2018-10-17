import { UserSetModule } from './user-set.module';

describe('UserSetModule', () => {
  let userSetModule: UserSetModule;

  beforeEach(() => {
    userSetModule = new UserSetModule();
  });

  it('should create an instance', () => {
    expect(userSetModule).toBeTruthy();
  });
});
