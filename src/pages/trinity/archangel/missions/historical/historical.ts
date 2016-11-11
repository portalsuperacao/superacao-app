import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserStorageService } from '../../../../providers/database/user-storage-service';

@Component({
  selector: 'page-archangel-missions-historical',
  templateUrl: 'archangel-missions-historical.html',
})

export class ArchangelMissionsHistoricalPage {
  mission;
  historical;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mission = this.navParams.get('mission');
  }

  ionViewDidLoad() {
    this.historical = this.updateDatas(this.mission);
  }

  updateDatas(mission) {
    return new Promise((resolve) => {
      Promise.resolve()
      .then(getHistorical)
      .then(resolvePromise)

      function getHistorical() {
        let historical = []
        for(let i = 0; i < 5; i++) {
          historical.push({
            user: mission.users.angel,
            date: new Date(),
            description:'It is a long established fact that a reader'
          });
        }

        return historical;
      }

      function resolvePromise(historical) {
        resolve(historical);
      }

    });
  }






}
