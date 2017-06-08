
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../../providers/database/auth-service';

@Component({
  selector: 'page-auth-register-conclusion',
  templateUrl: 'register-conclusion.html',
})
export class AuthRegisterConclusionPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService) {
      console.log(this.authService.user);
  }
}
