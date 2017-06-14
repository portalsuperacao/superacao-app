
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterTypeCancerPage } from '../type-cancer/type-cancer';
import { AuthRegisterPastCancerPage } from '../past-cancer/past-cancer';
import { AuthService } from '../../../../providers/database/auth.service';

@Component({
  selector: 'page-auth-register-state',
  templateUrl: 'register-state.html',
})
export class AuthRegisterStatePage {
  typeUser;

  constructor(
    public navCtrl : NavController,
    public navParams: NavParams,
    public authService: AuthService) {
    this.typeUser = this.navParams.get('typeUser');
  }

  nextPageMetastases(params) {
    this.authService.user.cancer_status = 'during_treatment'
    this.navCtrl.push(AuthRegisterTypeCancerPage, params);
  }

  nextPageRemissao(params) {
    this.authService.user.cancer_status = 'overcome'
    this.navCtrl.push(AuthRegisterPastCancerPage, params);
  }

}
