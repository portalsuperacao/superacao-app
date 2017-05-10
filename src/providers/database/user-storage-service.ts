import { Injectable } from '@angular/core'
import { AngularFire } from 'angularfire2'
import { Observable } from 'rxjs/Observable'
import { Utils } from '../util/utils'
import * as firebase from 'firebase'
import 'rxjs/Observable'

@Injectable()

export class UserStorageService {
  private db : any

  constructor(
    private af: AngularFire,
    private utils: Utils) {
  }


  registerUser(result, user) {
    result.photoURL = result.auth.photoURL
    result.name = result.auth.displayName || user.name
    result.email = result.auth.email

    let data = {
      provider : result.provider,
      name : result.name,
      email: result.email || null,
      avatar: result.photoURL || "https://placehold.it/150x150",
      occupation: "",
      birthdate: "",
      state: "",
      city: "",
      country: "",
      genre: "",
      relationship: "",
      religion: "",
      children: 0,
      cancer_name: "",
      type_cancer : {
        is_metastasis: 0,
        is_recurrent: 0
      },
      treatment: {
        circurgia: 0,
        quimioterapia: 0,
        radiografia: 0,
        terapia_oral: 0,
        terapia_oval: 0,
        terapias_naturais: 0
      },
      phrase_of_difficulties: "",
      healing_phrase: "",
      emotion: {
        status: "Normal",
        img: "./assets/images/emoji-happy.svg",
        is_active: 0
      },
      type_user: "Normal",
      other_datas: {
        token_device: "",
        active: "1",
        last_access: new Date().getTime()
      }
    }

    this.db = this.af.database.object(`/users/${result.uid}`)
    this.db.set(data)
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
