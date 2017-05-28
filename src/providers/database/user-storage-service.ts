import { Injectable } from '@angular/core'
import { AngularFire } from 'angularfire2'
import { Observable } from 'rxjs/Observable'
import { Utils } from '../util/utils'
import { UserModel } from '../../model/user';
import 'rxjs/Observable'
import { Http, Headers, RequestOptions } from "@angular/http";

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
    user.avatar = result.photoURL || 'https://placehold.it/150x150';
    user.name = result.name || result.displayName;
    user.email = result.email;
    user.type_user = 'Normal';
    user.religion = 5;
    user.emotion = {
      img: './assets/images/emoji-happy.svg',
      is_active: 0,
      status: 'Normal'
    };
    this.db = this.af.database.object(`/users/${result.uid}`);
    this.db.set(user);

    let tempuser = {
      "pacient": "myself",
      "cancer_status": "during_treatment",
      "participant_profile": {
        "participant_type": "angel",
        "first_name": user.participant_profile.first_name,
        "last_name": "Oliveira",
        "occupation": "Corporate Response Specialist",
        "country": "Índia",
        "state": "Tocantins",
        "city": "Município de Nicolasdo Sul",
        "relationship": "Solteira",
        "sons": 4,
        "facebook": "http://swiftbarrows.co/petra",
        "instagram": "http://prohaska.net/luisa",
        "whatsapp": "http://grimetokes.name/norris",
        "youtube": "http://oconnell.info/zoey",
        "snapchat": "http://vonrueden.biz/rhett.hilpert",
        "genre": "other",
        "email": "loyce@hintz.io",
        "belief": "Kaffir Leaves"
      },
      "current_treatment_profile": {
        "metastasis": true,
        "relapse": false,
        "treatments": [
          {
            "status": "done",
            "treatment_type_id": 1
          }
        ]
      }
    }
    this.sendUserToBackEnd(tempuser);
    console.log("salvou o temp usuario:", tempuser);

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
    this.sendUserToBackEnd(user);
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

  getUserFromBackEnd(user) {
    return this.http.get("http://localhost:3000/api/v1/participant", user)
      .subscribe(res => console.log("Criou:", res), err => console.log("Error: ", err));
  }

  sendUserToBackEnd(user) {
    //user = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("user:", user)
    return this.http.post("http://localhost:3000/api/v1/participant", user, options)
      .subscribe(res => console.log("Criou:", res), err => console.log("Error: ", err));
  }

}
