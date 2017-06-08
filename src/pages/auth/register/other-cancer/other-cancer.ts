
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthRegisterConclusionPage } from '../conclusion/conclusion';
import { AuthService } from '../../../../providers/database/auth-service';
import { UserTreatmentAttributes, UserCancerTreatmentsAttributes } from '../../../../model/user';

@Component({
  selector: 'page-auth-register-other-cancer',
  templateUrl: 'register-other-cancer.html',
})
export class AuthRegisterOtherCancerPage {
  user: any;
  typeUser : any;
  typesCancer : UserCancerTreatmentsAttributes [];
  treatments : UserTreatmentAttributes [];

  constructor(
    public navCtrl : NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public alertCtrl: AlertController) {
    this.typeUser = this.navParams.get('typeUser');
    this.user = this.authService.user;

    this.typesCancer = [
      {
        cancer_type_id : 1,
        cancerous_type: 'Cancer 1'
      },
      {
        cancer_type_id : 2,
        cancerous_type: 'Cancer 2'
      }
    ];

    this.treatments = [
      {
        status: null,
        treatment_type_id: 1,
        treatable_type: 'Cirurgia'
      },
      {
        status: null,
        treatment_type_id: 2,
        treatable_type: 'Quimioterapia'
      }
    ];

    this.user.past_treatment_profile_attributes.treatments_attributes = this.treatments;
  }

  nextPage(params) {
    if(!this.user.past_treatment_profile_attributes.cancer_treatments_attributes) {
      this.showMessage();
      return;
    }

    this.user.past_treatment_profile_attributes.cancer_treatments_attributes = JSON.parse(this.user.past_treatment_profile_attributes.cancer_treatments_attributes);
    this.navCtrl.push(AuthRegisterConclusionPage, params);
  }

  showMessage() {
    let alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      subTitle: 'O usuário deve preencher algum tipo de câncer.',
      buttons: ['Fechar']
    })

    alert.present();
  }

  jsonStringify(obj) {
    return JSON.stringify(obj)
  }

}
