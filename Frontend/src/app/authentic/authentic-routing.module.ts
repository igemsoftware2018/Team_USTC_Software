import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { StartResetComponent } from './start-reset/start-reset.component';
import { CpltResetComponent } from './cplt-reset/cplt-reset.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'startreset', component: StartResetComponent},
  {path: 'cpltreset', component: CpltResetComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticRoutingModule { }
