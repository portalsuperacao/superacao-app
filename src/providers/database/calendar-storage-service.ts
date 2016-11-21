import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Calendar } from 'ionic-native';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as localforage from "localforage";
import 'rxjs/Observable';


@Injectable()

export class CalendarStorageService {


  constructor(private af: AngularFire) {

  }

  insertEvent(datas, userUid) {
    let startDate = new Date(datas.start_at);
    let endDate = new Date(datas.end_at);

    Calendar.createEvent(datas.title, datas.address, datas.comments, startDate, endDate);

    let database = this.af.database.list('/calendar/' + userUid);
    database.push(datas);
    this.setEventsLocal(datas);
  }

  updateEvent(newDatas, oldDatas, userUid) {
    let oldStartDate = new Date(oldDatas.start_at);
    let oldEndDate = new Date(oldDatas.end_at);

    let newStartDate = new Date(newDatas.start_at);
    let newEndDate = new Date(newDatas.end_at);

    let key = oldDatas.$key;

    if(newDatas.userUid) {
      delete newDatas.userUid;
    }

    Calendar.deleteEvent(oldDatas.title, oldDatas.address, oldDatas.comments, oldStartDate, oldEndDate);
    Calendar.createEvent(newDatas.title, newDatas.address, newDatas.comments, newStartDate, newEndDate);

    let database = this.af.database.list('/calendar/' + userUid);
    database.update(key, newDatas);
    this.setEventsLocal(newDatas);
  }

  removeEvent(userUid, datas) {
    let startDate = new Date(datas.start_at);
    let endDate = new Date(datas.end_at);

    Calendar.deleteEvent(datas.title, datas.address, datas.comments, startDate, endDate);

    let database = this.af.database.list('/calendar/' + userUid);
    database.remove(datas.$key);
    this.setEventsLocal(datas);
  }

  setEventsLocal(datas) {
    localforage.setItem('calendar', JSON.stringify(datas));
  }

  getEventsLocal() {
    return new Promise((resolve) => {
      localforage.getItem('calendar').then((datas : any) => {
        resolve(JSON.parse(datas));
      });
   });
  }

  getEvents(uidUser) {
    return new Promise((resolve) => {
        let subject = new BehaviorSubject(null);

          this.af.database.list('/calendar/' + uidUser).subscribe((datas) => {
            subject.next(datas);
          });

          if(!subject.getValue()) {
            this.af.database.list('/calendar/' + uidUser).subscribe((datas) => {
              resolve(datas);
            });

            setTimeout(() => {
              this.getEventsLocal().then((datas) => {
                resolve(datas);
              });
            }, 3000);

            return;
          }

          localforage.setItem('calendar', JSON.stringify(subject.getValue()));
          resolve(subject.getValue());

          setTimeout(() => {
            this.getEventsLocal().then((datas) => {
              resolve(datas);
            });
          }, 3000);
      });
  }

  getPublicEvents(uidUser) : any {
    return this.af.database.list('/calendar/' + uidUser, {
      query: {
        orderByChild: 'share',
        equalTo: true
      }
    })
  }
}
