
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterOtherDatas } from '../other-datas/other-datas';
import { RegisterOtherCancer } from '../other-cancer/other-cancer'

@Component({
  selector: 'page-register-past-cancer',
  templateUrl: 'register-past-cancer.html',
})
export class RegisterPastCancer {
  user: any

  constructor(public navCtrl : NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
  }

  sendDatas(pastCancer) {
    if(pastCancer) {
      this.navCtrl.push(RegisterOtherCancer, { user: this.user })
    } else {
      this.navCtrl.push(RegisterOtherDatas, { user: this.user })
    }
  }

}
