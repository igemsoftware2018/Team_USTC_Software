import { WatchInfoModule } from './watch-info.module';

describe('WatchInfoModule', () => {
  let watchInfoModule: WatchInfoModule;

  beforeEach(() => {
    watchInfoModule = new WatchInfoModule();
  });

  it('should create an instance', () => {
    expect(watchInfoModule).toBeTruthy();
  });
});
