import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { CalendarStorageService } from '../../../providers/database/calendar-storage-service';
import { MySpaceMedicinesEventPage } from './event/medicines-event';
import { LocalNotifications } from 'ionic-native';


@Component({
  selector: 'page-my-space-medicines',
  templateUrl: 'medicines.html'
})
export class MySpaceMedicinesPage {
  user;
  medicines;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userStorageService : UserStorageService,
    public calendarStorageService: CalendarStorageService,
    public modalCtrl : ModalController) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();

    this.user.subscribe((user) => {
      this.medicines = this.calendarStorageService.getMedicinesEvents(user.$key);
    });
  }

  newEvent() {
    let now = new Date();

    let modal = this.modalCtrl.create(MySpaceMedicinesEventPage);
    modal.present();

    modal.onDidDismiss((data) => {
      LocalNotifications.schedule({
        id: data.start_at,
        title: 'Medicamento!',
        text: 'Notificação!!!',
        at: now,
      });

      this.user.subscribe((user) => {
        this.calendarStorageService.insertMedicineEvent(user.$key, data);
      });
    });
  }

  removeEvent(medicine) {
    let alert = this.alertCtrl.create({
      title: "Deseja remover",
      message: "Você deseja mesmo remover o evento " + medicine.title,
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            LocalNotifications.clearAll();
            this.user.subscribe((user) => {
              this.calendarStorageService.removeMedicineEvent(user.$key, medicine);
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

  }

}
