import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../../../providers/database/auth.service';
import { UserStorageService } from '../../../../providers/database/user-storage.service';
import { UserModel } from './../../../../model/user';

@Component({
  selector: 'page-auth-register-conclusion',
  templateUrl: 'register-conclusion.html',
})
export class AuthRegisterConclusionPage {
  user: UserModel;
  isHelp: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public userStorageService: UserStorageService) {
      this.user = this.authService.user;
      this.isHelp = true
  }

  ionViewDidLoad() {
    this.verifyTypeUser();
  }

  signup(typeUser) {
  this.user.type = typeUser;

   this.authUser()
    .then(this.registerUser.bind(this))
    .catch(this.showMessage.bind(this))
  }

  authUser() {
    return this.authService.authUserEmail();
  }

  registerUser(authToken) {
    return this.userStorageService.registerUser(this.user, authToken);
  }

  verifyTypeUser() {
    if(this.user.cancer_status === 'during_treatment') {
      this.isHelp = false
    }
  }

  showMessage(error) {
    let alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      message: error,
      buttons: ['Ok']
    });

    alert.present();
  }
}
