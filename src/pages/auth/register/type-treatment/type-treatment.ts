
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterPastCancerPage } from '../past-cancer/past-cancer';

@Component({
  selector: 'page-auth-register-type-treatment',
  templateUrl: 'register-type-treatment.html',
})
export class AuthRegisterTypeTreatmentPage {
  typeUser;
  nextPage;

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.typeUser = this.navParams.get('typeUser');
    this.nextPage = AuthRegisterPastCancerPage;
  }

}
