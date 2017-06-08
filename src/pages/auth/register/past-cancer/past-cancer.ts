
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterConclusionPage } from '../conclusion/conclusion';
import { AuthRegisterOtherCancerPage } from '../other-cancer/other-cancer';

@Component({
  selector: 'page-auth-register-past-cancer',
  templateUrl: 'register-past-cancer.html',
})
export class AuthRegisterPastCancerPage {
  typeUser : any;
  nextPageConclusion : any;
  nextPageOtherCancer : any;

  constructor(
    public navCtrl : NavController, public navParams: NavParams) {
    this.typeUser = this.navParams.get('typeUser');
    this.nextPageConclusion = AuthRegisterConclusionPage;
    this.nextPageOtherCancer = AuthRegisterOtherCancerPage;
  }



}
