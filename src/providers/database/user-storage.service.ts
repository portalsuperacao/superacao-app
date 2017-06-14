import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFire } from 'angularfire2'
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { ENV } from '../../config/environment.dev';
import { Utils } from '../util/utils'
import { UserModel } from '../../model/user';


@Injectable()

export class UserStorageService {
  db : any;
  user: any;
  headers : Headers;
  options : RequestOptions;

  constructor(
    public af: AngularFire,
    public http: Http,
    public utils: Utils) {
      this.user = new UserModel();
      this.headers = new Headers();
  }

  registerUser(user: UserModel, token: string) {
    let send = { participant: null };
    send.participant = user;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', `Bearer ${token}`);
    this.options = new RequestOptions({headers: this.headers});
    console.log(JSON.stringify(send));

    return this.http.post(`${ENV.HOST}/participant.json`, JSON.stringify(send), this.options)
      .map(res => res.json())
      .toPromise();
}

  getUser() {
    return new Promise((resolve) => {
      this.af.auth.subscribe((user) => {
        if(user) {
          this.af.database.object(`/users/${user.uid}`).subscribe((data) => {
            resolve(data)
          })
        }
      })
    })
  }

  getUserObs() {
    let datas
    return new Observable((subject) => {
      this.af.auth.subscribe((user) => {
        if(user) {
          this.af.database.object(`/users/${user.uid}`).subscribe((data) => {
            subject.next(data)
            datas = data
          })
        }
      })
    })
  }

  updateUser(user, uid) {
    delete user.$key
    this.db = this.af.database.object(`/users/${uid}`)
    this.db.set(user)
  }

  findUser(uid) {
    return new Promise((resolve) => {
      this.db = this.af.database.object(`/users/${uid}`).subscribe((userDatas) => {
        resolve(userDatas)
      })
    })
  }

  findUserObs(uid) : any {
    return this.af.database.object(`/users/${uid}`)
  }

  setEmotion(emotion, userUid) {
    this.db = this.af.database.object(`/users/${userUid}`)
    this.db.update({"emotion" : emotion})
  }

  updateLastAccess(date, userUid) {
    this.db = this.af.database.object(`/users/${userUid}`)
    this.db.update({"other_datas/last_access" : date})
  }

  updateTokenDevice(userUid) {
    this.utils.getPushDeviceToken().then((device) => {
      this.db = this.af.database.object(`/users/${userUid}`)
      this.db.update({"other_datas/token_device": device})
    }).catch((err) => {
      console.log('Push notification desativado!')
    })
  }

  getMessageDay() {
    return new Promise((resolve) => {
      this.af.database.list('/message_of_day').subscribe((snapshots) => {
      })
    })
  }

}
