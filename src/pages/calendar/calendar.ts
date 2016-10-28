import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { DateUtil } from '../../providers/util/date-util';
import { CalendarEventEditPage } from './new-event/edit-event/edit-event';
import { CalendarStorageService } from '../../providers/database/calendar-storage-service';



@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})

export class CalendarPage {
   events;
   dateSelected;
   listSchedule;
   allSechedule;
   showCalendar;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public calendarStorageService: CalendarStorageService,
    public userStorageService : UserStorageService,
    public dateUtil: DateUtil,
    public alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    this._generateAllSchedule();
  }

  removeEvent(event) {
    let alert = this.alertCtrl.create({
      title: "Deseja remover",
      message: "Você deseja mesmo remover o evento " + event.message,
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.calendarStorageService.removeEvent(event);
            this.navCtrl.setRoot(CalendarPage);
          }
        },
        {
          text: 'Não'
        }
      ]
    });

    alert.present();
  }

  updateDate($event) {
    this.dateSelected = $event;
    this.listSchedule = this._generateListSchedule($event);
  }

  editEvent(event) {
    this.navCtrl.push(CalendarEventEditPage, {datas: event});
  }

  _generateAllSchedule() {
    this.showCalendar = false;
    let loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loading.present();
    this.userStorageService.getUser().then((user : any) => {
      this.calendarStorageService.getEvents(user.$key).then((event) => {
        this.allSechedule = event;
        this.showCalendar = true;
        loading.dismiss();
      });
    });
  }

  _generateListSchedule(dateNow) {
    return new Promise((resolve) => {
      let schedules = []
      this.userStorageService.getUser().then((user : any) => {
        this.calendarStorageService.getEvents(user.$key).then((events : any) => {
          events.forEach((event) => {
            if(this.dateUtil.removeTime(dateNow) >= this.dateUtil.removeTime(event.start_at) &&
            this.dateUtil.removeTime(dateNow) <= this.dateUtil.removeTime(event.end_at)) {
              event.userUid = user.$key;
              schedules.push(event);
            }
          });

          resolve(schedules);
        });
      });
    });

  }

}
