import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isTauri } from '@tauri-apps/api/core';
import { authGuard } from './services/auth/auth.guard';
import { stalkerRoutes } from './stalker/stalker.routes';
import { xtreamRoutes } from './xtream-tauri/xtream.routes';

const routes: Routes = [
    {
        path: 'auth-callback',
        loadComponent: () =>
            import('./auth-callback/auth-callback.component').then(
                (c) => c.AuthCallbackComponent
            ),
    },
    {
        path: 'manage-playlist',
        loadComponent: () =>
            import('./home/manage-playlists.component').then((c) => c.ManagePlaylistComponent),
        canActivate: [authGuard],
    },
    {
        path: '',
        loadComponent: () =>
            import(
                './player/components/netflix-view/netflix-view.component'
            ).then((c) => c.NetflixViewComponent),
        canActivate: [authGuard],
    },
    {
        path: 'playlists',
        loadComponent: () =>
            import(
                './player/components/video-player/video-player.component'
            ).then((c) => c.VideoPlayerComponent),
        canActivate: [authGuard],
    },
    {
        path: 'iptv',
        loadComponent: () =>
            import(
                './player/components/video-player/video-player.component'
            ).then((c) => c.VideoPlayerComponent),
        canActivate: [authGuard],
    },
    {
        path: 'playlists/:id',
        loadComponent: () =>
            import(
                './player/components/video-player/video-player.component'
            ).then((c) => c.VideoPlayerComponent),
        canActivate: [authGuard],
    },
    {
        path: 'csiptv',
        loadComponent: () =>
            import(
                './player/components/netflix-view/netflix-view.component'
            ).then((c) => c.NetflixViewComponent),
        canActivate: [authGuard],
    },
    {
        path: 'csiptv/:id',
        loadComponent: () =>
            import(
                './player/components/netflix-view/netflix-view.component'
            ).then((c) => c.NetflixViewComponent),
        canActivate: [authGuard],
    },
    {
        path: 'settings',
        loadComponent: () =>
            import('./settings/settings.component').then(
                (c) => c.SettingsComponent
            ),
        canActivate: [authGuard],
    },
    ...(isTauri()
        ? xtreamRoutes
        : [
              {
                  path: 'xtreams/:id',
                  loadComponent: () =>
                      import('./xtream/xtream-main-container.component').then(
                          (c) => c.XtreamMainContainerComponent
                      ),
              },
          ]),
    {
        path: 'portals/:id',
        loadComponent: () =>
            import('./stalker/stalker-main-container.component').then(
                (c) => c.StalkerMainContainerComponent
            ),
    },
    ...stalkerRoutes,
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes /* {
            enableTracing: !AppConfig.production,
        } */
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
