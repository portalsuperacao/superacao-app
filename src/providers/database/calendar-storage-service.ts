import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Calendar } from '@ionic-native/calendar';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


@Injectable()

export class CalendarStorageService {
  connection = true
  refreshDatas = new EventEmitter();
  constructor(
    private af: AngularFire,
    private calendar: Calendar,
    private network: Network,
    private storage: Storage) {
      this.network.onDisconnect().subscribe(() => {
        this.connection = false
      });
      this.network.onConnect().subscribe(() => {
        this.connection = true
      });
  }

  insertEvent(datas, userUid) {
    let startDate = new Date(datas.start_at);
    let endDate = new Date(datas.end_at);

    this.calendar.createEvent(datas.title, datas.address, datas.comments, startDate, endDate);


    let database = this.af.database.list(`/calendar/${userUid}`);
    return database.push(datas).then((db) => {
      datas.$key = db.path.o[2];
      this.insertEventsLocal(datas);
      this.refreshDatas.emit(datas);
    });
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

    this.calendar.deleteEvent(oldDatas.title, oldDatas.address, oldDatas.comments, oldStartDate, oldEndDate);
    this.calendar.createEvent(newDatas.title, newDatas.address, newDatas.comments, newStartDate, newEndDate);
    this.updateEventsLocal(newDatas);

    let database = this.af.database.list(`/calendar/${userUid}`);
    this.refreshDatas.emit(newDatas);
    return database.update(key, newDatas);

  }

  removeEvent(userUid, datas) {
    let startDate = new Date(datas.start_at);
    let endDate = new Date(datas.end_at);

    this.calendar.deleteEvent(datas.title, datas.address, datas.comments, startDate, endDate);
    this.removeEventsLocal(datas);
    let database = this.af.database.list(`/calendar/${userUid}`);
    this.refreshDatas.emit(null);

    return database.remove(datas.$key);

  }

  insertEventsLocal(datas) {
    this.storage.get('calendar').then((storageDatas : any) => {
      if(storageDatas) {
        storageDatas.push(datas);
      } else {
        storageDatas = []
        storageDatas.push(datas);
      }
      this.storage.set('calendar', storageDatas);
    });
  }

  removeEventsLocal(datas) {
    this.storage.get('calendar').then((storageDatas : any) => {
      let newDatas = storageDatas.filter((data) => datas.$key != data.$key)
      this.storage.set('calendar', newDatas);
    });
  }

  updateEventsLocal(datas) {
    this.storage.get('calendar').then((storageDatas : any) => {
      let newDatas = storageDatas.map((data) => {
        if(datas.$key == data.$key) {
          return datas;
        } else {
          return storageDatas;
        }
      });
      this.storage.set('calendar', newDatas);
    });
  }

  getEvents(userUid) {
    return new Promise((resolve) => {
      if(this.connection) {
        this.af.database.list(`/calendar/${userUid}`).subscribe((datas) => {
          resolve(datas);
        });
      } else {
        this.storage.get('calendar').then((datas : any) => {
          resolve(datas);
        });
      }
    });
  }

  getPublicEvents(userUid) : any {
    return this.af.database.list(`/calendar/${userUid}`, {
      query: {
        orderByChild: 'share',
        equalTo: true
      }
    })
  }
}
