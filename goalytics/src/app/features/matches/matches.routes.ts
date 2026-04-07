import { Routes } from '@angular/router';

export const MATCH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/match-list-page/match-list-page').then((m) => m.MatchListPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/match-detail-page/match-detail-page').then((m) => m.MatchDetailPage),
  },
];