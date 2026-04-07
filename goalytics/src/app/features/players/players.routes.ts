import { Routes } from '@angular/router';

export const PLAYER_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/player-detail-page/player-detail-page').then((m) => m.PlayerDetailPage),
  },
];