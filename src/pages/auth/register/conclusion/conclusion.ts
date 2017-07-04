import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public userStorageService: UserStorageService) {
      this.user = this.authService.user;
      this.isHelp = true
  }

  ionViewDidLoad() {
    this.verifyTypeUser();
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  }

  verifyTypeUser() {
    if(this.user.cancer_status === 'during_treatment') {
      this.isHelp = false
    }
  }

  signup(typeUser) {
    this.user.type = typeUser;
  }


  registerUser(authToken) {
    this.loading.show();
    return this.userStorageService.registerUser(this.user).then(() => {
      this.loading.dismiss();
    });
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
