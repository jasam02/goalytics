import { Routes } from '@angular/router';

export const TEAM_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/team-detail-page/team-detail-page').then((m) => m.TeamDetailPage),
  },
];