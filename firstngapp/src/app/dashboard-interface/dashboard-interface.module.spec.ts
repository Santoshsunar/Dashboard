import { DashboardInterfaceModule } from './dashboard-interface.module';

describe('DashboardInterfaceModule', () => {
  let dashboardInterfaceModule: DashboardInterfaceModule;

  beforeEach(() => {
    dashboardInterfaceModule = new DashboardInterfaceModule();
  });

  it('should create an instance', () => {
    expect(dashboardInterfaceModule).toBeTruthy();
  });
});
