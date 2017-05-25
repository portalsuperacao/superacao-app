
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterTypeCancer } from '../type-cancer/type-cancer';
import { RegisterOtherCancer } from '../other-cancer/other-cancer';

@Component({
  selector: 'page-register-state',
  templateUrl: 'register-state.html',
})
export class RegisterState {
  user : any
  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
  }

  sendDatas(stateUser) {
    this.user.state = stateUser
    if(stateUser === 'tratamento') {
      this.navCtrl.push(RegisterTypeCancer, { user: this.user })
    } else {
      this.navCtrl.push(RegisterOtherCancer, { user: this.user })
    }
  }


}
