import { Injectable } from '@angular/core'
import { AngularFire } from 'angularfire2'
import { Observable } from 'rxjs/Observable'
import { Utils } from '../util/utils'
import { UserModel } from '../../model/user';
import { Http, Headers } from '@angular/http';
import 'rxjs/Observable'

@Injectable()

export class UserStorageService {
  private db: any;

  constructor(
    private af: AngularFire,
    private utils: Utils,
    private http: Http) {
  }


  registerUser(result) {
    let user = new UserModel();
    user.participant_profile.first_name = result.name || result.displayName;
    user.participant_profile.participant_type = "overcomer";
    user.participant_profile.first_name = "Allison";
    user.participant_profile.email = "allisonverdam@gmail.com"    
    
    this.db = this.af.database.object(`/users/${result.uid}`);
    this.db.set(user);
  }

  getUser() {
    return new Promise((resolve) => {
      this.af.auth.subscribe((user) => {
        if (user) {
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
        if (user) {
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

  findUserObs(uid): any {
    return this.af.database.object(`/users/${uid}`)
  }

  setEmotion(emotion, userUid) {
    this.db = this.af.database.object(`/users/${userUid}`)
    this.db.update({ "emotion": emotion })
  }

  updateLastAccess(date, userUid) {
    this.db = this.af.database.object(`/users/${userUid}`)
    this.db.update({ "other_datas/last_access": date })
  }

  updateTokenDevice(userUid) {
    this.utils.getPushDeviceToken().then((device) => {
      this.db = this.af.database.object(`/users/${userUid}`)
      this.db.update({ "other_datas/token_device": device })
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

  getUserFromBackEnd(headers){
    return console.log("pegar usuario: ", headers)
  }

  sendUserToBackEnd(user) {
    console.log('Usuario:', user)
    let headers = new Headers();
    return this.http.post("http://192.168.244.119:3000", user, headers).subscribe(res => {
      console.log("cadastrou: ",res)
    }, err => {
      console.log("deu erro: ",err)
    })
  }

}
