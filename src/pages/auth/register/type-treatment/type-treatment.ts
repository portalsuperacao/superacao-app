
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthRegisterPastCancerPage } from '../past-cancer/past-cancer';
import { AuthService } from '../../../../providers/database/auth-service';
import { UserTreatmentAttributes, UserCancerTreatmentsAttributes } from '../../../../model/user';

@Component({
  selector: 'page-auth-register-type-treatment',
  templateUrl: 'register-type-treatment.html',
})
export class AuthRegisterTypeTreatmentPage {
  typeUser : any;
  typesCancer : UserCancerTreatmentsAttributes [];
  treatments : UserTreatmentAttributes [];
  user : any;


  constructor(
    public navCtrl : NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthService
  ) {
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

    this.user.current_treatment_profile_attributes.treatments_attributes = this.treatments;
  }

  nextPage(params) {
    if(!this.user.current_treatment_profile_attributes.cancer_treatments_attributes) {
      this.showMessage();
      return;
    }

    this.user.current_treatment_profile_attributes.cancer_treatments_attributes = JSON.parse(this.user.current_treatment_profile_attributes.cancer_treatments_attributes);
    this.navCtrl.push(AuthRegisterPastCancerPage, params);

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
