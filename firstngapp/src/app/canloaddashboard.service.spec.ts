import { TestBed } from '@angular/core/testing';

import { CanloaddashboardService } from './canloaddashboard.service';

describe('CanloaddashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanloaddashboardService = TestBed.get(CanloaddashboardService);
    expect(service).toBeTruthy();
  });
});
