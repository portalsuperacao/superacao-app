import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage.service';
import { MySpaceStorageService } from '../../../providers/database/my-space-storage-service';
import { MySpaceMedicinesEventPage } from './event/medicines-event';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-my-space-medicines',
  templateUrl: 'medicines.html'
})
export class MySpaceMedicinesPage {
  user;
  medicines;
  date;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userStorageService : UserStorageService,
    public mySpaceStorageService: MySpaceStorageService,
    public modalCtrl : ModalController,
    public localNotifications: LocalNotifications) {

  }

  ionViewDidLoad() {
    this.userStorageService.getUser().subscribe((user) => {
      this.user = user
      this.medicines = this.mySpaceStorageService.getMedicinesEvents(this.user.$key)
      this.date = new Date().getTime()
    });
  }

  newEvent() {
    let modal = this.modalCtrl.create(MySpaceMedicinesEventPage);
    modal.present();

    modal.onDidDismiss((data) => {
      this.mySpaceStorageService.insertMedicineEvent(this.user.$key, data).then(() => {
        this.medicines = this.mySpaceStorageService.getMedicinesEvents(this.user.$key)
      })
    });
  }

  removeEvent(medicine) {
    let alert = this.alertCtrl.create({
      title: "Deseja remover?",
      message: "Você deseja mesmo remover o evento " + medicine.title + " ?",
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.localNotifications.clearAll();
            this.mySpaceStorageService.removeMedicineEvent(this.user.$key, medicine).then(() => {
              this.medicines = this.mySpaceStorageService.getMedicinesEvents(this.user.$key)
            });
          }
        },
        {
          text: 'Não'
        }
      ]
    });

    alert.present();

  }

  editEvent(medicine) {
    let modal = this.modalCtrl.create(MySpaceMedicinesEventPage, {"medicine" : medicine});
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) {
        return;
      }

      this.mySpaceStorageService.updateMedicineEvent(this.user.$key, data).then(() => {
        this.medicines = this.mySpaceStorageService.getMedicinesEvents(this.user.$key)
      })
    })
  }

  intervalOfHours(interval) {
    let date = new Date()
    date.setTime(date.getTime() + (interval*60*60*1000))
    return date
  }

}
