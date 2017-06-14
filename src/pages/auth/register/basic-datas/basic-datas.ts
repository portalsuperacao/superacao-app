import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthRegisterPicturePage } from '../picture/picture';
import { AuthRegisterTypeUserPage } from '../type-user/type-user';
import { AuthService } from '../../../../providers/database/auth.service';
import { DateUtil } from '../../../../providers/util/date-util';

@Component({
  selector: 'page-auth-register-basic-datas',
  templateUrl: 'register-basic-datas.html'
})
export class AuthRegisterBasicDatasPage {
  alert : any;
  user : any;
  credentias: any;
  facebookDatas : any;
  states: any;
  sons : any;
  childrens : any;
  relationships : any;
  beliefs : any;
  genres : any;
  isRadioButtonClass : any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams : NavParams,
    public authService: AuthService,
    public dateUtil: DateUtil) {
      this.credentias = this.authService.credentials;
      this.user = this.authService.user;
      this.facebookDatas = this.navParams.get('facebookDatas');

      this.isRadioButtonClass = false;
      this.states =  [ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" ];
      this.sons = ["Não tenho filhos", "1 filho", "2 filhos", "3 filhos", "4 filhos", "Mais de 4 filhos"];
      this.relationships = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
      this.beliefs = ["Católico", "Evangelico", "Espirita", "Ateu", "Outra religião"];
      this.genres = ["Masculino", "Feminino"];
  }

  nextPage() {
    this.validateBirthdate()
    .then(this.verifyPushPage.bind(this))
    .catch(this.showMessage.bind(this))
  }

  validateBirthdate() {
    this.credentias.email = this.user.participant_profile_attributes.email;
    return new Promise((resolve, reject) => {
      if(this.dateUtil.calculateAge(this.user.participant_profile_attributes.birthdate) > 18) {
        resolve();
      } else {
        reject("Você deve ser maior de idade!");
      }
    })
  }

  verifyPushPage() {
    if(this.facebookDatas) {
      this.navCtrl.push(AuthRegisterTypeUserPage);
    } else {
      this.navCtrl.push(AuthRegisterPicturePage);
    }
  }

  showMessage(message) {
    this.alert = this.alertCtrl.create({
      title: 'Ops! Ocorreu um problema!',
      message: message,
      buttons: ['Ok']
    });

    this.alert.present();
  }

  clickCheckTerms() {
    this.isRadioButtonClass = !this.isRadioButtonClass;
  }

}
