import { ExploreModule } from './explore.module';

describe('ExploreModule', () => {
  let exploreModule: ExploreModule;

  beforeEach(() => {
    exploreModule = new ExploreModule();
  });

  it('should create an instance', () => {
    expect(exploreModule).toBeTruthy();
  });
});
