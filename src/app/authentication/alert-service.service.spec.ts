import { TestBed } from '@angular/core/testing';

import { AlertsService } from '../services/alerts.service';

describe('AlertServiceService', () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
