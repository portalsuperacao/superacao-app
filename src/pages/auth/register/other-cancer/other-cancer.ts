
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterConclusionPage } from '../conclusion/conclusion';

@Component({
  selector: 'page-auth-register-other-cancer',
  templateUrl: 'register-other-cancer.html',
})
export class AuthRegisterOtherCancerPage {
  typeUser;
  nextPage;

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.typeUser = this.navParams.get('typeUser');
    this.nextPage = AuthRegisterConclusionPage;
  }

}
