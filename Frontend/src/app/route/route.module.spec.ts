import { AppRoutingModule } from './route.module';

describe('RouteModule', () => {
  let routeModule: AppRoutingModule;

  beforeEach(() => {
    routeModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(routeModule).toBeTruthy();
  });
});
