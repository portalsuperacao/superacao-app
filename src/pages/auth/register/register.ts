import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthRegisterBasicDatasPage } from './basic-datas/basic-datas';
import { AuthService } from '../../../providers/database/auth.service';


@Component({
  selector: 'page-auth-register',
  templateUrl: 'register.html'
})


export class AuthRegisterPage {
  alert : any;
  user : any;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public keyboard: Keyboard,
    public authService: AuthService) {
      this.user = this.authService.user;
  }

  ionViewWillEnter() {
    this.keyboard.disableScroll(true);
  }

  ionViewWillLeave() {
    this.keyboard.disableScroll(false);
  }

  nextPageNormal() {
    this.alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      message: 'Preencha todos os campos para continuar!',
      buttons: ['Ok']
    });

    this.navCtrl.push(AuthRegisterBasicDatasPage);

  }

  nextPageFacebook() {
    this.authService.getFacebookDatas().then((datas) => {
      this.navCtrl.push(AuthRegisterBasicDatasPage, { facebookDatas: true });
    }).catch((error) => {
      console.log(error);
      this.alert = this.alertCtrl.create({
        title: 'Ops! Ocorreu um problema!',
        message: 'Você não está em um dispositivo movel!',
        buttons: ['Ok']
      });

      this.alert.present()
    })


  }

}
