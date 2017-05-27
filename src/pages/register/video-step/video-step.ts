import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VideoStepPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-video-step',
  templateUrl: 'video-step.html',
})
export class VideoStepPage {
  form;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.form = navParams.get("form");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoStepPage');
  }

  

}
