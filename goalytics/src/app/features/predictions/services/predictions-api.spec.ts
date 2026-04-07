import { TestBed } from '@angular/core/testing';

import { PredictionsApi } from './predictions-api';

describe('PredictionsApi', () => {
  let service: PredictionsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictionsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
