import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListPage } from './match-list-page';

describe('MatchListPage', () => {
  let component: MatchListPage;
  let fixture: ComponentFixture<MatchListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
