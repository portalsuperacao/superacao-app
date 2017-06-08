
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthRegisterPastCancerPage } from '../past-cancer/past-cancer';
import { AuthService } from '../../../../providers/database/auth-service';

@Component({
  selector: 'page-auth-register-type-treatment',
  templateUrl: 'register-type-treatment.html',
})
export class AuthRegisterTypeTreatmentPage {
  typeUser : any;
  typesCancer : any;
  treatments : any;
  user : any;
  disconnect: boolean;


  constructor(
    public navCtrl : NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService) {
      this.typeUser = this.navParams.get('typeUser');
      this.user = this.authService.user;
      this.disconnect = false;
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
        this.user.current_treatment_profile_attributes.treatments_attributes = this.treatments;
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
    if(!this.user.current_treatment_profile_attributes.cancer_treatments_attributes) {
      this.showMessage('O usuário deve preencher algum tipo de câncer.');
      return;
    }

    this.user.current_treatment_profile_attributes.cancer_treatments_attributes = JSON.parse(this.user.current_treatment_profile_attributes.cancer_treatments_attributes);
    this.navCtrl.push(AuthRegisterPastCancerPage, params);

  }

  showMessage(message) {
    let alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      subTitle: message,
      buttons: ['Fechar']
    })

    alert.present();
  }

  jsonStringify(obj) {
    return JSON.stringify(obj)
  }

}
