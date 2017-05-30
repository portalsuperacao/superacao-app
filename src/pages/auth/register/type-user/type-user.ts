
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterStatePage } from '../state/state'

@Component({
  selector: 'page-auth-register-type-user',
  templateUrl: 'register-type-user.html',
})
export class AuthRegisterTypeUserPage {
  nextPage
  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.nextPage = AuthRegisterStatePage;
  }

}
