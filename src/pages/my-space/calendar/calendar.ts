import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { DateUtil } from '../../../providers/util/date-util';
import { CalendarEventEditPage } from './new-event/edit-event/edit-event';
import { CalendarStorageService } from '../../../providers/database/calendar-storage-service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})

export class CalendarPage {
   events;
   user;
   listSchedule;
   allSchedule : Observable<any>;
   verifyNetwork = true;
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
    public network: Network,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    Promise.resolve()
    .then(this._verifyIfHaveConnect.bind(this))
    .then(this._getUser.bind(this))
    .then(this._generateAllSchedule.bind(this));
  }

  updateDate($event) {
    this.listSchedule = this._generateSchedule($event);
  }

  removeEvent(event, userUid) {
    let alert = this.alertCtrl.create({
      title: "Deseja remover",
      message: "Você deseja mesmo remover o evento " + event.message,
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.listSchedule.subscribe((schedule) => {
              this.calendarStorageService.removeEvent(schedule.user.$key, event).then(() => {
                this._generateAllSchedule();
                this.updateDate(new Date());
              });
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
      this.calendarStorageService.updateEvent(datas.newDatas, datas.oldDatas, datas.userKey).then(() => {
        this.updateDate(new Date(datas.newDatas.start_at));
      });
    })

  }

  private _getUser() {
    this.userStorageService.getUser().then((user: any) => {
      this.user = user
    });
  }

  private _verifyIfHaveConnect() {
    this.network.onDisconnect().subscribe(() => {
      console.log('deslogado!');
      this.verifyNetwork = false;
    });
    this.network.onConnect().subscribe(() => {
      console.log('logado!');
      this.verifyNetwork = true;
    });
  }

  private _generateAllSchedule() {
    this.allSchedule = this._generateSchedule(new Date());
    this.showCalendar = true;
  }

  private _generateSchedule(dateNow) {
    return new Observable((subject) => {
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
        subject.next(wrapper);
      }
    })
  }

}