import { TestBed } from '@angular/core/testing';

import { MatchesApi } from './matches-api';

describe('MatchesApi', () => {
  let service: MatchesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
