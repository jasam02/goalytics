import { Routes } from '@angular/router';

export const PREDICTION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/prediction-page/prediction-page').then((m) => m.PredictionPage),
  },
];