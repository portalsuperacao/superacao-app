import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Apresentation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-apresentation',
  templateUrl: 'apresentation.html'
})
export class ApresentationPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Apresentation Page');
  }

}
