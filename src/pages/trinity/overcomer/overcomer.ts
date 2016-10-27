import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the StatusEmotion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-overcomer',
  templateUrl: 'overcomer.html'
})
export class OvercomerPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello StatusEmotion Page');
  }

}
