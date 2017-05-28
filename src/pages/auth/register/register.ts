import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthRegisterBasicDatasPage } from './basic-datas/basic-datas';


@Component({
  selector: 'page-auth-register',
  templateUrl: 'register.html'
})


export class AuthRegisterPage {
  nextPage;

  constructor(public navCtrl: NavController ) {
    this.nextPage = AuthRegisterBasicDatasPage;
  }

}
