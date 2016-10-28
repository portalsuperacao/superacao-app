import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserStorageService } from '../../../../providers/database/user-storage-service';

@Component({
  selector: 'page-archangel-missions',
  templateUrl: 'archangel-missions.html',
})

export class ArchangelMissionsPage {

  trinitys = [];
  overcomer = [];
  angel = [];
  archangel;

  constructor(public navCtrl: NavController, public userStorageService: UserStorageService) {
    this._updateDatas();
  }

  _updateDatas() {
    this.userStorageService.getUser().then((user : any) => {
      this.archangel = user;

      this.trinitys = [{
        archangel : user.$key,
        angel: "c9Em4kqXqQY6Rx0OHgnTsRpvrQi1",
        overcomer: "HyAqq0wlb2QxF7uqKlLhPAiEVPE3"
      },
      {
        archangel : user.$key,
        angel: "c9Em4kqXqQY6Rx0OHgnTsRpvrQi1",
        overcomer: "zua3bsHHBkTPUhbyRC5k5xHam8V2",
      }];

      this.trinitys.forEach((trinity, index) => {
        this.userStorageService.findUser(trinity.overcomer).then((datas) => {
          this.overcomer[index] = datas;
        });

        this.userStorageService.findUser(trinity.angel).then((datas) => {
          this.angel[index] = datas;
        });

      });
    });
  }


}
