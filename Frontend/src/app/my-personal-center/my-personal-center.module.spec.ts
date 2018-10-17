import { MyPersonalCenterModule } from './my-personal-center.module';

describe('MyPersonalCenterModule', () => {
  let myPersonalCenterModule: MyPersonalCenterModule;

  beforeEach(() => {
    myPersonalCenterModule = new MyPersonalCenterModule();
  });

  it('should create an instance', () => {
    expect(myPersonalCenterModule).toBeTruthy();
  });
});
