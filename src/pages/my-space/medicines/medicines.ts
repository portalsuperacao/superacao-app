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
      this.date = new Date();
    })
  }

  newEvent() {
    let modal = this.modalCtrl.create(MySpaceMedicinesEventPage);
    modal.present();

    modal.onDidDismiss((medicine) => {
      if(!medicine) {
        return;
      }

      Promise.resolve()
      .then(verifyLocalNotificationIsSchedule.bind(this))
      .then(scheduleLocalNotification.bind(this))
      .then(verifyLocalNotificationTriggered.bind(this))
      .then(registerMedicineEventInLocalStorage.bind(this))

      function verifyLocalNotificationIsSchedule() {
        if(!this.platform.is('android') || !this.platform.is('ios')) {
          return false;
        }
        return this.localNotifications.getAllIds().then((ids) => {
          if(ids.length == 0) {
            return ids.length;
          } else {
            return ids[ids.length - 1] + 1;
          }
        })
      }

      function scheduleLocalNotification(idNotification) {
        if(!idNotification) {
          return false;
        }
        medicine.idNotification = idNotification;
        this.localNotifications.schedule({
           id: idNotification,
           title: medicine.title,
           text: medicine.obs,
           at: medicine.start_at,
           led: 'FF0000',
           sound: null
        });
      }

      function verifyLocalNotificationTriggered(isSchedule) {
        if(!isSchedule) {
          return false;
        }
        this.localNotifications.on('trigger',(notification) => {
          if(notification.id == medicine.idNotification) {
            let dateInterval = new Date();
            dateInterval.setMinutes(this.date.getMinutes() + medicine.interval)
            console.log(notification);
            // this.localNotifications.update({
            //   id: medicine.idNotification,
            //   at: 5000,
            //   every: 'hour'
            // })
          }
        })
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
            this.localNotifications.cancel(medicine.idNotification)
            this.localNotifications.cancelAll();
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
    modal.onDidDismiss((datas) => {
      if(!datas) {
        return;
      }

      if(datas.start_at == medicine.start_at) {
        this.localNotifications.update({
          id: datas.idNotification,
          title: datas.title,
          text: datas.obs,
          at: datas.start_at,
          led: 'FF0000',
          sound: null
        })
      } else {
        this.localNotifications.update({
          id: datas.idNotification,
          title: datas.title,
          text: datas.obs,
          at: new Date().setTime(this.date.getMinutes() + medicine.interval),
          led: 'FF0000',
          sound: null
        })
      }
      this.mySpaceStorageService.updateMedicineEvent(this.user.$key, datas).then(() => {
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
