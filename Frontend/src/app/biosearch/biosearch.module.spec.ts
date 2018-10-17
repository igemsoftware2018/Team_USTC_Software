import { BiosearchModule } from './biosearch.module';

describe('BiosearchModule', () => {
  let biosearchModule: BiosearchModule;

  beforeEach(() => {
    biosearchModule = new BiosearchModule();
  });

  it('should create an instance', () => {
    expect(biosearchModule).toBeTruthy();
  });
});
