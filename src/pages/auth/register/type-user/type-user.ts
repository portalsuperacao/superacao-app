
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterState } from '../state/state'

@Component({
  selector: 'page-register-type-user',
  templateUrl: 'register-type-user.html',
})
export class RegisterTypeUser {
  user : any
  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
  }

  sendDatas(typeUser) {
    this.user.type = typeUser
    this.navCtrl.push(RegisterState, { user: this.user })
  }
}
