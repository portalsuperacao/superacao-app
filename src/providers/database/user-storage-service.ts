import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Utils } from '../util/utils';
import * as firebase from 'firebase';
import * as localforage from "localforage";
import 'rxjs/Observable';

@Injectable()

export class UserStorageService {
  private db : any

  constructor(
    private af: AngularFire,
    private utils: Utils) {

  }

  // ==== Local storage =====
  setUserLocal(datas) {
      this.utils.getPushDeviceToken().then((deviceToken : any) => {
        datas.token_device = deviceToken.registrationId;
        localforage.setItem('user', JSON.stringify(datas));
      }).catch(() => {
        localforage.setItem('user', JSON.stringify(datas));
      });
  }

  getUserLocal() {
    return new Promise((resolve) => {
      localforage.getItem('user').then((datas : any) => {
        resolve((datas) ? JSON.parse(datas) : false);
      });
    });
  }

  clear() {
    localforage.clear();
  }

  // ================= Firebase ===============

  registerUser(result) {
    if(result.auth) {
      result.photoURL = result.auth.photoURL;
      result.name = result.auth.displayName;
      result.email = result.auth.email;
    }


    let data = {
      provider : result.provider,
      name : result.name,
      email: result.email || null,
      avatar: result.photoURL || "https://placehold.it/150x150",
      emotion: {
        status: "Normal",
        img: "./assets/images/happy.svg",
        is_active: 0
      },
      type_user: "Normal",
      other_datas: {
          token_device: "",
          active: "1",
          last_access: new Date().getTime()
      },

    }

    this.db = this.af.database.object('/users/' + result.uid);
    this.db.set(data);
  }


  getUser() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          this.af.database.object('/users/' + user.uid).subscribe((data) => {
              resolve(data);
            });

            setTimeout(() => {
              this.getUserLocal().then((data : any) => {
                resolve(data);
              });
            }, 5000);
        });

    });
  }

  getUserObs() {
    let datas;
    return new Observable((subject) => {
      firebase.auth().onAuthStateChanged((user) => {
        this.af.database.object('/users/' + user.uid).subscribe((data) => {
            subject.next(data);
            datas = data
        });

        setTimeout(() => {
          if(!datas) {
            this.getUserLocal().then((data : any) => {
              subject.next(data);
            });
          }
        }, 5000);
      });
    });
  }

  updateUser(user, uid) {
    delete user.$key;

    this.db = this.af.database.object('/users/' + uid);
    this.db.set(user);
    this.setUserLocal(user);
  }

  findUser(uid) {
    return new Promise((resolve) => {
      this.db = this.af.database.object('/users/' + uid).subscribe((userDatas) => {
        resolve(userDatas);
      });
    });
  }

  findUserObs(uid) : any {
    return this.af.database.object('/users/' + uid);
  }

  setEmotion(emotion, uidUser) {
    this.db = this.af.database.object('/users/' + uidUser);
    this.db.update({"emotion" : emotion});

    this.getUserLocal().then((datas : any) => {
      datas.emotion = emotion;
      this.setUserLocal(datas);
    });

  }

  updateLastAccess(date, userUid) {
    this.db = this.af.database.object('/users/' + userUid);
    this.db.update({"other_datas/last_access" : date});

    this.getUserLocal().then((datas : any) => {
      datas.other_datas.last_access = date;
      this.setUserLocal(datas);
    });
  }

  updateTokenDevice(userUid) {
    this.utils.getPushDeviceToken().then((device) => {
      this.db.update({"other_datas/token_device" : device});
    }).catch((err) => {
      console.log(err);
    });
  }

  getMessageDay() {
    return new Promise((resolve) => {
      this.af.database.list('/message_of_day').subscribe((snapshots) => {
      });
    });
  }




}
