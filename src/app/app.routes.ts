import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
     {
        path: '',
        loadComponent: () => import('./login.component/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard.component/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    }
];
