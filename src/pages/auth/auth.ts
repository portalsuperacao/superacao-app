import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from './../../providers/database/auth.service';

import { AuthLoginPage } from './login/login';
import { AuthRegisterPage } from './register/register';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})


export class AuthPage {
  registerPage;
  loginPage;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService) {
      this.registerPage = AuthRegisterPage
      this.loginPage = AuthLoginPage;
  }

}
