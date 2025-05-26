import { Routes } from '@angular/router';
import { AuthGuard } from "./handler/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
      },
    ]
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/tasks/tasks.page').then( m => m.TasksPage)
  },
];
