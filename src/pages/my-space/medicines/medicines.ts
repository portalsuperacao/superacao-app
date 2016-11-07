import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { MySpaceMedicinesEventPage } from './event/medicines-event';
import { LocalNotifications } from 'ionic-native';


@Component({
  selector: 'page-my-space-medicines',
  templateUrl: 'medicines.html'
})
export class MySpaceMedicinesPage {
  user

  constructor(
    public navCtrl: NavController,
    public userStorageService : UserStorageService,
    public modalCtrl : ModalController) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
  }

  newEvent() {
    let now = new Date().getTime();
    let modal = this.modalCtrl.create(MySpaceMedicinesEventPage);
    modal.present();

    modal.onDidDismiss((data) => {
      console.log(data);

      LocalNotifications.schedule({
        id: 1,
        title: 'Medicamento!',
        text: 'Notificação!!!',
        led: 'FF0000',
        at: new Date()
      })
    });
  }

}
