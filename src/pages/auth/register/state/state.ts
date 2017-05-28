
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterTypeCancerPage } from '../type-cancer/type-cancer';
import { AuthRegisterPastCancerPage } from '../past-cancer/past-cancer';

@Component({
  selector: 'page-auth-register-state',
  templateUrl: 'register-state.html',
})
export class AuthRegisterStatePage {
  typeUser;
  nextPageMetastases;
  nextPageRemissao;

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.typeUser = this.navParams.get('typeUser');
    this.nextPageMetastases = AuthRegisterTypeCancerPage;
    this.nextPageRemissao = AuthRegisterPastCancerPage;
  }

}
