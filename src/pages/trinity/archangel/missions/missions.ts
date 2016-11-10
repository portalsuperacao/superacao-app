import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ArchangelMissionsDetailsPage } from './details/details';
import { ArchangelMissionsHistoricalPage } from './historical/historical';
import { UserStorageService } from '../../../../providers/database/user-storage-service';


@Component({
  selector: 'page-archangel-missions',
  templateUrl: 'archangel-missions.html',
})

export class ArchangelMissionsPage {

  overcomer = [];
  angel = [];
  archangel;
  missions;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl : LoadingController,
    public userStorageService: UserStorageService) {
    this.missions = this.updateDatas(this.userStorageService, this.loadingCtrl);
  }

  openDetails(mission) {
    this.navCtrl.push(ArchangelMissionsDetailsPage, {mission: mission})

  }

  updateDatas(userStorageService, loadingCtrl) {
    let loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loading.present();

    return new Promise((resolve) => {
      Promise.resolve()
      .then(getMissions)
      .then(getArchangel)
      .then(getOvercomerAndAngel)
      .then(resolvePromise)

      function getMissions() {
        let missions = [];

        for(let i = 0; i < 7; i++) {
          missions.push({
            users : {
              angel: "c9Em4kqXqQY6Rx0OHgnTsRpvrQi1",
              overcomer: "HyAqq0wlb2QxF7uqKlLhPAiEVPE3"
            },
            details: {
              categoria: 'Sumiço',
              prazo: new Date().getTime(),
              orientações: 'HUshuasnasuhsahusa shahsasa'
            }
          });
        }
        return missions;
      }

      function getArchangel(missions) {
        return {
          archangel: userStorageService.getUser(),
          missions: missions
        }
      }

      function getOvercomerAndAngel(data) {
        for(let i = 0; i < data.missions.length; i++) {
          userStorageService.findUser(data.missions[i].users.overcomer).then((overcomer) => {
            data.missions[i].users.overcomer = overcomer
          });

          userStorageService.findUser(data.missions[i].users.angel).then((angel) => {
            data.missions[i].users.angel = angel
          });
        }
        return data;
      }

      function resolvePromise(missions) {
        loading.dismiss();
        resolve(missions);
      }

  });

}




}
