
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthRegisterConclusionPage } from '../conclusion/conclusion';
import { AuthService } from '../../../../providers/database/auth-service';

@Component({
  selector: 'page-auth-register-other-cancer',
  templateUrl: 'register-other-cancer.html',
})

export class AuthRegisterOtherCancerPage {
  user: any;
  typeUser : any;
  typesCancer :  any;
  treatments : any;

  constructor(
    public navCtrl : NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController) {
      this.typeUser = this.navParams.get('typeUser');
      this.user = this.authService.user;
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();

    Promise.resolve()
    .then(getAllTreatments.bind(this))
    .then(getAllTypersCancers.bind(this))
    .then(closeLoading.bind(this))
    .catch(disconnectNetwork.bind(this))

    function getAllTreatments() {
      return this.authService.getAllTreatments().then((datas) => {
        this.treatments = datas;
        this.user.past_treatment_profile_attributes.treatments_attributes = this.treatments;
      });
    }

    function getAllTypersCancers() {
      return this.authService.getAllTypesCancers().then((datas) => {
        this.typesCancer = datas;
      });
    }

    function closeLoading() {
      loading.dismiss();
    }

    function disconnectNetwork() {
      this.showMessage('Você deve estar conectado para continuar o cadastro.');
      this.disconnect = true;
      loading.dismiss();
    }
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
