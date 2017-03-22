import { Component } from '@angular/core';
import { Platform, NavController, ModalController, AlertController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { MySpaceStorageService } from '../../../providers/database/my-space-storage-service';
import { MySpaceMedicinesEventPage } from './event/medicines-event';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-my-space-medicines',
  templateUrl: 'medicines.html'
})
export class MySpaceMedicinesPage {
  user : any;
  medicines : any;
  date : any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userStorageService : UserStorageService,
    public mySpaceStorageService: MySpaceStorageService,
    public modalCtrl : ModalController,
    public localNotifications: LocalNotifications) {

  }

  ionViewDidLoad() {
    this.userStorageService.getUser().then((user) => {
      this.user = user
    })
    .then(() => {
      this.medicines = this.mySpaceStorageService.getMedicinesEvents(this.user.$key)
      this.date = new Date().getTime()
    })
  }

  newEvent() {
    let now = new Date().getTime();
    let _5_sec_from_now = new Date(now + 5 * 1000);

    let modal = this.modalCtrl.create(MySpaceMedicinesEventPage);
    modal.present();

    modal.onDidDismiss((medicine) => {
      if(!medicine) {
        return;
      }

      let idNotification;
      Promise.resolve()
      .then(generateIdNotification.bind(this))
      .then(verifyLocalNotificationIsSchedule.bind(this))
      .then(scheduleLocalNotification.bind(this))
      .then(verifyLocalNotificationTriggered.bind(this))
      .then(registerMedicineEventInLocalStorage.bind(this))

      function generateIdNotification() {
        return this.localNotifications.getAll().then((notification) => {
          console.log(notification)
          // idNotification = ids[ids.length - 1]
          // console.log(idNotification)
          // console.log(ids[ids.length - 1])
          // if(ids.length == 0) {
          //   idNotification = 1
          // } else {
          //   idNotification = idNotification + 1
          // }
          // data.idNotification = idNotification
        })
      }

      function verifyLocalNotificationIsSchedule() {
        if(this.platform.is('ios') || this.platform.is('android')) {
          return true;
        } else {
          return false;
        }
      }

      function scheduleLocalNotification(isDevice) {
        if(!isDevice) {
          return false;
        }

        this.localNotifications.schedule({
           title: medicine.title,
           text: medicine.text,
           at: _5_sec_from_now,
           led: 'FF0000',
           sound: null
        });

        return true;
      }

      function verifyLocalNotificationTriggered(isDevice) {
        if(!isDevice) {
          return false;
        }
        // this.localNotifications.on('trigger',(notification) => {
        //   if(notification == idNotification) {
        //     LocalNotifications.schedule({
        //       text: 'Medicamento notificação!',
        //       at: _5_sec_from_now,
        //       led: 'FF0000',
        //       every: 'hour',
        //       sound: null
        //     })
        //   }
        // })
      }

      function registerMedicineEventInLocalStorage() {
        this.mySpaceStorageService.insertMedicineEvent(this.user.$key, medicine).then(() => {
          this.medicines = this.mySpaceStorageService.getMedicinesEvents(this.user.$key)
        })
      }

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
            this.localNotifications.clearAll()
            //this.LocalNotifications.clear(medicine.idNotification)
            this.mySpaceStorageService.removeMedicineEvent(this.user.$key, medicine).then(() => {
              this.medicines = this.mySpaceStorageService.getMedicinesEvents(this.user.$key)
            });

            this.localNotifications.getAll().then((notification) => {
              console.log(notification)
            })
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
