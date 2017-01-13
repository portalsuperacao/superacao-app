import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})

export class ProfileEditPage {
  user;
  date;
  constructor(
    public navCtrl: NavController,
    public ViewCtrl: ViewController,
    public params: NavParams) {
      this.user = this.params.get('user');
    }

  ionViewDidLoad() {
    this.date = new Date();
  }

  closePage() {
    this.ViewCtrl.dismiss();
  }

}
