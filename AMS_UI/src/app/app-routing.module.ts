import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRefereeComponent } from './components/add-referee/add-referee.component';
import { ArticlePoolComponent } from './components/article-pool/article-pool.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoadDocumentComponent } from './components/load-document/load-document.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RefereeComponent } from './components/referee/referee.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AuthGuardService } from './services/Browser/auth-guard.service';

const routes: Routes = [
  {path : 'Login', component : LoginComponent},
  {path : 'LoadArticle', component : LoadDocumentComponent},
  {path : 'ArticlePool', component : ArticlePoolComponent, canActivate: [AuthGuardService]},
  {path : 'Referee', component : RefereeComponent, canActivate: [AuthGuardService]},
  {path : 'ForgetPassword', component : ForgetPasswordComponent},
  {path : 'UpdatePassword', component : UpdatePasswordComponent, canActivate: [AuthGuardService]},
  {path : 'AddReferee', component : AddRefereeComponent, canActivate: [AuthGuardService]},
  {path : 'Home', component : MainComponent},
  {path : '**', component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
