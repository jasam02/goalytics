import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailPage } from './match-detail-page';

describe('MatchDetailPage', () => {
  let component: MatchDetailPage;
  let fixture: ComponentFixture<MatchDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
