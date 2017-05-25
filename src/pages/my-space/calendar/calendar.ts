
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { DateUtil } from '../../../providers/util/date-util';
import { CalendarEventEditPage } from './new-event/edit-event/edit-event';
import { CalendarStorageService } from '../../../providers/database/calendar-storage-service';



@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})

export class CalendarPage {
   events;
   user;
   listSchedule;
   allSchedule;
   showCalendar = false;
   loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public calendarStorageService: CalendarStorageService,
    public userStorageService : UserStorageService,
    public dateUtil: DateUtil,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    Promise.resolve()
    .then(this._getUser.bind(this))
    .then(this._generateAllSchedule.bind(this))
    .then(this.updateSchedule.bind(this))
  }

  updateDate($event) {
    this.listSchedule = this._generateSchedule($event);
  }

  updateSchedule() {
    this.calendarStorageService.refreshDatas.subscribe((datas) => {
      this._generateAllSchedule();
      this.updateDate(new Date());
    });
  }

  removeEvent(event, userUid) {
    let alert = this.alertCtrl.create({
      title: "Deseja remover",
      message: "Você deseja mesmo remover o evento " + event.message,
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.listSchedule.then((schedule) => {
              this.calendarStorageService.removeEvent(schedule.user.$key, event);
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

  editEvent(event) {
    let modal = this.modalCtrl.create(CalendarEventEditPage, {datas: event});
    modal.present();

    modal.onDidDismiss((datas) => {
      this.calendarStorageService.updateEvent(datas.newDatas, datas.oldDatas, datas.userKey);
    });
  }

  private _getUser() {
    this.userStorageService.getUser().then((user: any) => {
      this.user = user
    });
  }

  private _generateAllSchedule() {
    this._generateSchedule(new Date()).then((schedules : any) => {
      this.allSchedule = schedules.events;
      this.showCalendar = true;
    });
  }

  private _generateSchedule(dateNow) {
    return new Promise((resolve) => {
      Promise.resolve(dateNow)
      .then(getUserAndDateNow.bind(this))
      .then(getEvents.bind(this))
      .then(verifyIfEventSelected.bind(this))
      .then(resolvePromise.bind(this))

      function getUserAndDateNow(dateNow) {
        let wrapper = { user : this.user, dateNow: dateNow }
        return wrapper;
      }

      function getEvents(wrapper) {
        return this.calendarStorageService.getEvents(wrapper.user.$key).then((events : any) => {
          wrapper.events = events;
          return wrapper;
        });
      }

      function verifyIfEventSelected(wrapper) {
        wrapper.eventsSelected = wrapper.events.filter((event) => {
          if(this.dateUtil.removeTime(dateNow) >= this.dateUtil.removeTime(event.start_at) &&
            this.dateUtil.removeTime(dateNow) <= this.dateUtil.removeTime(event.end_at)) {
            return true;
          } else {
            return false;
          }
        });
        return wrapper;
      }

      function resolvePromise(wrapper) {
        resolve(wrapper);
      }
    })
  }

}
