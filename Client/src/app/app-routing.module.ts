import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { MyfilesComponent } from './myfiles/myfiles.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PrivateGuard } from './_helpers/private.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profil', component: ProfilComponent, canActivate: [PrivateGuard]},
  {path: 'myfiles', component: MyfilesComponent, canActivate: [PrivateGuard]},
  {path: 'logout', component: LogoutComponent},
  {path: 'result', component: SearchResultComponent, canActivate: [PrivateGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
