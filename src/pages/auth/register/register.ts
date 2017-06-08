import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthRegisterBasicDatasPage } from './basic-datas/basic-datas';
import { AuthService } from '../../../providers/database/auth-service';


@Component({
  selector: 'page-auth-register',
  templateUrl: 'register.html'
})


export class AuthRegisterPage {
  alert : any
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authService: AuthService) {

  }

  nextPageNormal(params) {
    this.alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      message: 'Preencha todos os campos para continuar!',
      buttons: ['Ok']
    });

    if(params.trim() == '') {
      this.alert.present();
      return;
    }
    this.authService.user.participant_profile_attributes.first_name = params;
    this.navCtrl.push(AuthRegisterBasicDatasPage);

  }

  nextPageFacebook() {
    this.authService.getFacebookDatas().then((datas) => {
      this.navCtrl.push(AuthRegisterBasicDatasPage, { facebookDatas: true });
    }).catch((error) => {
      this.alert = this.alertCtrl.create({
        title: 'Ops! Ocorreu um problema!',
        message: 'Você não está em um dispositivo movel!',
        buttons: ['Ok']
      });

      this.alert.present()
    })


  }

}
