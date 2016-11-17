import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MySpaceDoctorsEventPage } from './event/doctors-event';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { CalendarStorageService } from '../../../providers/database/calendar-storage-service';


@Component({
  selector: 'page-my-space-doctors',
  templateUrl: 'doctors.html'
})
export class MySpaceDoctorsPage {
  user

  constructor(
    public navCtrl: NavController,
    public userStorageService : UserStorageService,
    public calendarStorageService: CalendarStorageService,
    public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
  }


  newEvent() {
    let now = new Date().getTime();
    let _5_sec_from_now = new Date(now + 5 * 1000);

    let modal = this.modalCtrl.create(MySpaceDoctorsEventPage);
    modal.present();

    modal.onDidDismiss((data) => {
      console.log(data);

      /*if(!data) {
        return;
      }

      this.user.subscribe((user) => {
        this.calendarStorageService.insertMedicineEvent(user.$key, data);
      });*/
    });
  }



}
