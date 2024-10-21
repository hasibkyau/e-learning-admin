import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {SidenavListComponent} from './components/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {CheckAuthAccessGuard} from '../../auth-guard/check-auth-access.guard';
import {AdminAuthRoleGuard} from '../../auth-guard/admin-auth-role.guard';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [CheckAuthAccessGuard, AdminAuthRoleGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'customization',
        loadChildren: () => import('./customization/customization.module').then(m => m.CustomizationModule),
        canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: false, delay: false}
      },
      {
        path: 'admin-control',
        loadChildren: () => import('./admin-control/admin-control.module').then(m => m.AdminControlModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: false, delay: false}
      },
      {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'quiz',
        loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'review',
        loadChildren: () => import('./review/review.module').then(m => m.ReviewModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'product-review',
        loadChildren: () => import('./product-review/product-review.module').then(m => m.ProductReviewModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'seo',
        loadChildren: () => import('./seo/seo.module').then(m => m.SeoModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: false, delay: false}
      },
      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: false, delay: false}
      },
      {
        path: 'additional-pages',
        loadChildren: () => import('./additional-pages/additional-pages.module').then(m => m.AdditionalPagesModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
      {
        path:"order",
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path:"offline",
        loadChildren: () => import('./offline-course/offline-course.module').then(m => m.OfflineCourseModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path:"notice",
        loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule)
      },
      {
        path:"product-type",
        loadChildren: () => import('./product-type/product-type.module').then(m => m.ProductTypeModule)
      },
      {
        path:"address",
        loadChildren:() => import('./address/address.module').then(m => m.AddressModule)
      },

      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
        canActivate: [CheckAuthAccessGuard],
        data: {preload: true, delay: false}
      },
    ]
  },
];

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [],
  providers: [CheckAuthAccessGuard, AdminAuthRoleGuard]
})
export class PagesModule {
}
