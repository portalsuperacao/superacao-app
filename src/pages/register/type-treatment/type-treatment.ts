
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPastCancer } from '../past-cancer/past-cancer';

@Component({
  selector: 'page-register-type-treatment',
  templateUrl: 'register-type-treatment.html',
})
export class RegisterTypeTreatment {
  user : any
  typeTreatment: any

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
    this.typeTreatment = {
      cirurgia: false,
      quimioterapia: false,
      radiografia: false,
      terapia_oral: false,
      terapia_alvo: false,
      terapia_naturais: false
    }
  }

  sendDatas() {
    this.user.typeTreatment = this.typeTreatment
    this.navCtrl.push(RegisterPastCancer, { user: this.user })
  }
}
