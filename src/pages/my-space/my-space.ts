import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MySpace page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-space',
  templateUrl: 'my-space.html'
})
export class MySpacePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MySpace Page');
  }

}
