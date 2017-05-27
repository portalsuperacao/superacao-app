
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-register-other-datas',
  templateUrl: 'register-other-datas.html',
})
export class RegisterOtherDatas {
  user: any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
    console.log(this.user)
  }
}
