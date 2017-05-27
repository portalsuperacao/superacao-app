
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterOtherDatas } from '../other-datas/other-datas';

@Component({
  selector: 'page-register-other-cancer',
  templateUrl: 'register-other-cancer.html',
})
export class RegisterOtherCancer {
  user : any
  otherCancer: any = {
    type: null,
    treatment: null,
  }

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
    this.otherCancer.treatment = {
      cirurgia: false,
      quimioterapia: false,
      radiografia: false,
      terapia_oral: false,
      terapia_alvo: false,
      terapia_naturais: false
    }
  }

  sendDatas() {
    this.user.otherCancer = this.otherCancer
    this.navCtrl.push(RegisterOtherDatas, { user: this.user })
  }
}
