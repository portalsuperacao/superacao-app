import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthService } from '../../../providers/database/auth.service';


@Component({
  selector: 'page-auth-register',
  templateUrl: 'register.html'
})


export class AuthRegisterPage {
  alert : any;
  email: string;
  password: string;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public keyboard: Keyboard,
    public authService: AuthService) {
  }

  ionViewDidLoad(){
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  }

  nextPageNormal() {
    this.loading.present();
    this.authService.user.participant_profile_attributes.email = this.email;
    this.authService.createUserWithEmail(this.email, this.password)
      .then(((datas) => {
        this.loading.dismiss();
        this.authService.authUserEmail(this.email, this.password);
      }))
      .catch(this.showMessage.bind(this))
  }

  nextPageFacebook() {
    this.loading.present();
    this.authService.authUserFacebook()
      .then(((datas) => {
        this.loading.dismiss();
      }))
      .catch(this.showMessage.bind(this))
  }

  showMessage(error) {
    this.loading.dismiss();
    this.alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      message: 'Já existe uma conta com este e-mail!',
      buttons: ['Ok']
    });

    this.alert.present();
  }


}
