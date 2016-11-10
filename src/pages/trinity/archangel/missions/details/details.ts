import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserStorageService } from '../../../../providers/database/user-storage-service';

@Component({
  selector: 'page-archangel-missions-details',
  templateUrl: 'archangel-missions-details.html',
})

export class ArchangelMissionsDetailsPage {
  mission;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mission = this.navParams.get('mission');
  }




}
