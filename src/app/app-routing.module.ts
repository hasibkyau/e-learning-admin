import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from "../environments/environment";
import {AdminAuthStateGuard} from "./auth-guard/admin-auth-state.guard";
import {AdminAuthGuard} from "./auth-guard/admin-auth.guard";
import {UserAuthGuard} from './auth-guard/user-auth.guard';
import {UserAuthStateGuard} from './auth-guard/user-auth-state.guard';
import {CustomPreloadingStrategy} from './core/utils/preloading-strategy';

const routes: Routes = [
  // {
  //   path: '',
  //   canActivate: [UserAuthGuard],
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // },
  {
    path: '',
    redirectTo: environment.adminLoginUrl,
    pathMatch: 'full'
  },
  // ADMIN
  {
    path: environment.adminLoginUrl,
    canActivate: [AdminAuthStateGuard],
    loadChildren: () => import('./admin/admin-auth/admin-auth.module').then(m => m.AdminAuthModule)
  },
  {
    path: environment.adminBaseUrl,
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('./admin/pages/pages.module').then(m => m.PagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: CustomPreloadingStrategy,
    relativeLinkResolution: 'legacy',
    // initialNavigation: 'enabled',
    anchorScrolling: 'enabled'
  })],
  providers: [CustomPreloadingStrategy, AdminAuthGuard, AdminAuthStateGuard, UserAuthGuard, UserAuthStateGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
