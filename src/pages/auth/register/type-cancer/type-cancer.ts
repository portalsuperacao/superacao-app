
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthRegisterTypeTreatmentPage } from '../type-treatment/type-treatment';
import { AuthService } from '../../../../providers/database/auth-service';

@Component({
  selector: 'page-auth-register-type-cancer',
  templateUrl: 'register-type-cancer.html',
})
export class AuthRegisterTypeCancerPage {
  typeUser;
  user;

  constructor(
    public navCtrl : NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthService) {
    this.typeUser = this.navParams.get('typeUser');
    this.user = this.authService.user;
  }

  nextPage(params) {
    if(!this.user.current_treatment_profile_attributes.metastasis &&
    !this.user.current_treatment_profile_attributes.relapse) {
      this.showMessage();
      return;
    }
    this.navCtrl.push(AuthRegisterTypeTreatmentPage, params)
  }

  showMessage() {
    let alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      subTitle: 'O usuário deve preencher algum tipo de câncer.',
      buttons: ['Fechar']
    })

    alert.present();
  }

}
