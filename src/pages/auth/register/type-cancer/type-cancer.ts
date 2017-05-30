
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterTypeTreatmentPage } from '../type-treatment/type-treatment';

@Component({
  selector: 'page-auth-register-type-cancer',
  templateUrl: 'register-type-cancer.html',
})
export class AuthRegisterTypeCancerPage {
  typeUser;
  nextPage;

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.typeUser = this.navParams.get('typeUser');
    this.nextPage = AuthRegisterTypeTreatmentPage;
  }

}
