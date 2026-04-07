import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailPage } from './player-detail-page';

describe('PlayerDetailPage', () => {
  let component: PlayerDetailPage;
  let fixture: ComponentFixture<PlayerDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
