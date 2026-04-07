import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then(m => m.HOME_ROUTES),
  },
  {
    path: 'matches',
    loadChildren: () =>
      import('./features/matches/matches.routes').then(m => m.MATCH_ROUTES),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./features/teams/teams.routes').then(m => m.TEAM_ROUTES),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./features/players/players.routes').then(m => m.PLAYER_ROUTES),
  },
  {
    path: 'predictions',
    loadChildren: () =>
      import('./features/predictions/predictions.routes').then(m => m.PREDICTION_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
];