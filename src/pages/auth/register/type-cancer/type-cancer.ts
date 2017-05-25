
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterTypeTreatment } from '../type-treatment/type-treatment';

@Component({
  selector: 'page-register-type-cancer',
  templateUrl: 'register-type-cancer.html',
})
export class RegisterTypeCancer {
  user : any
  typeCancer: any

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
  }

  sendDatas(typeUser) {
    this.user.type = typeUser
    this.navCtrl.push(RegisterTypeTreatment, { user: this.user })
  }
}
