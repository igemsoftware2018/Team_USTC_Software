import { AuthenticModule } from './authentic.module';

describe('AuthenticModule', () => {
  let authenticModule: AuthenticModule;

  beforeEach(() => {
    authenticModule = new AuthenticModule();
  });

  it('should create an instance', () => {
    expect(authenticModule).toBeTruthy();
  });
});
