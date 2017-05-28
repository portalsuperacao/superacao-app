import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthRegisterTypeUserPage } from '../type-user/type-user';

@Component({
  selector: 'page-auth-register-picture',
  templateUrl: 'register-picture.html',
})
export class AuthRegisterPicturePage {
  nextPage;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.nextPage = AuthRegisterTypeUserPage;
  }

}
