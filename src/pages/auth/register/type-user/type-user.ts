
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthRegisterStatePage } from '../state/state';
import { AuthService } from '../../../../providers/database/auth-service';

@Component({
  selector: 'page-auth-register-type-user',
  templateUrl: 'register-type-user.html',
})
export class AuthRegisterTypeUserPage {
  isFamiliar : boolean
  constructor(
    public navCtrl : NavController,
    public navParams: NavParams,
    public authService : AuthService
  ) {
    this.isFamiliar = false;

  }

  nextPage(params) {
    this.authService.user.pacient = params.typeUser;
    this.navCtrl.push(AuthRegisterStatePage, {typeUser: 'paciente'});
  }

  pushPageWhenSelected(value) {
    this.authService.user.pacient = 'family_member';
    this.authService.user.family_member = value;
    this.navCtrl.push(AuthRegisterStatePage, {typeUser: 'familiar'});
  }

}
