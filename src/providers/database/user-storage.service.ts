

import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ENV } from '../../config/environment.dev';
import { Utils } from '../util/utils'
import { UserModel } from '../../model/user';

@Injectable()

export class UserStorageService {
  headers : Headers;
  options : RequestOptions;
  authToken: string

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private http: Http,
    private utils: Utils) {
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', `Bearer ${this.authToken}`);
      this.options = new RequestOptions({headers: this.headers});
  }

  registerUser(user: UserModel) {
    let send = { participant: null };
    send.participant = user;

    return this.http.post(`${ENV.HOST}/participant.json`, JSON.stringify(send), this.options)
      .map(res => res.json())
      .toPromise();
}

  getUser() {
    return this.http.get(`${ENV.HOST}/participant.json`, this.options)
      .map(res => res.json())
      .catch((e => {
        if (e.status === 401) {
          return Observable.throw(false);
        } else {
          return Observable.throw(null);
        }
      }));
  }

  updateUser(user, uid) {
    delete user.$key
    let database = this.db.object(`/users/${uid}`)
    database.set(user)
  }

  findUser(uid) {
    return new Promise((resolve) => {
      this.db.object(`/users/${uid}`).subscribe((userDatas) => {
        resolve(userDatas)
      })
    })
  }

  findUserObs(uid) : any {
    return this.db.object(`/users/${uid}`)
  }

  setEmotion(emotion, userUid) {
    let database = this.db.object(`/users/${userUid}`)
    database.update({"emotion" : emotion})
  }

  updateLastAccess(date, userUid) {
    let database = this.db.object(`/users/${userUid}`)
    database.update({"other_datas/last_access" : date})
  }

  updateTokenDevice(userUid) {
    this.utils.getPushDeviceToken().then((device) => {
      let database = this.db.object(`/users/${userUid}`)
      database.update({"other_datas/token_device": device})
    }).catch((err) => {
      console.log('Push notification desativado!')
    })
  }

  getMessageDay() {
    return new Promise((resolve) => {
      this.db.list('/message_of_day').subscribe((snapshots) => {
      })
    })
  }

}
