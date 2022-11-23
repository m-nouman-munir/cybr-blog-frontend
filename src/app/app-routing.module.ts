import { HomeModule } from './pages/home/home.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'category-post/:category',
    loadChildren: () =>
      import('./pages/categorically-posts/categorically-posts.module').then(
        (m) => m.CategoricallyPostsModule
      ),
  },
  {
    path: 'footer',
    loadChildren: () =>
      import('./shared/module/footer/footer.module').then(
        (m) => m.FooterModule
      ),
  },
  {
    path: 'PopularSidebarPost',
    loadChildren: () =>
      import(
        './shared/module/popular-sidebar-post/popular-sidebar-post.module'
      ).then((m) => m.PopularSidebarPostModule),
  },
  {
    path: 'anonymous-post',
    loadChildren: () =>
      import('./shared/module/anonymous-post/anonymous-post.module').then(
        (m) => m.AnonymousPostModule
      ),
  },
  {
    path: 'single-post/:id',
    loadChildren: () =>
      import('./pages/Posts/read-single-post/read-single-post.module').then(
        (m) => m.ReadSinglePostModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/Posts/create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/Posts/create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'update',
    loadChildren: () =>
      import('./pages/Posts/update/update.module').then((m) => m.UpdateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
