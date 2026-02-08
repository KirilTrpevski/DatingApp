import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('../features/home/home').then((c) => c.Home),
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        loadComponent: () =>
          import('../features/members/members').then((c) => c.Members),
      },
      {
        path: 'members/:id',
        loadComponent: () =>
          import('../features/members/member-detailed/member-detailed').then(
            (c) => c.MemberDetailed,
          ),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('../features/messages/messages').then((c) => c.Messages),
      },
      {
        path: 'lists',
        loadComponent: () =>
          import('../features/lists/lists').then((c) => c.Lists),
      },
    ],
  },
  {
    path: 'errors',
    loadComponent: () =>
      import('../features/test-errors/test-errors').then((c) => c.TestErrors),
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import('../shared/errors/server-error/server-error').then(
        (c) => c.ServerError,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../shared/errors/not-found/not-found').then((c) => c.NotFound),
  },
];
