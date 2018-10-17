import { OthersPersonalCenterModule } from './others-personal-center.module';

describe('OthersPersonalCenterModule', () => {
  let othersPersonalCenterModule: OthersPersonalCenterModule;

  beforeEach(() => {
    othersPersonalCenterModule = new OthersPersonalCenterModule();
  });

  it('should create an instance', () => {
    expect(othersPersonalCenterModule).toBeTruthy();
  });
});
