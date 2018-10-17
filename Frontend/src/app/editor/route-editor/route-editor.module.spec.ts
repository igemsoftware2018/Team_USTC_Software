import { RouteEditorModule } from './route-editor.module';

describe('RouteEditorModule', () => {
  let routeEditorModule: RouteEditorModule;

  beforeEach(() => {
    routeEditorModule = new RouteEditorModule();
  });

  it('should create an instance', () => {
    expect(routeEditorModule).toBeTruthy();
  });
});
