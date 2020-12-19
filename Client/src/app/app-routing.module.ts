import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { MyfilesComponent } from './myfiles/myfiles.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'myfiles', component: MyfilesComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'result', component: SearchResultComponent},
  //{path: 'home', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
