import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { ENV } from '../../config/environment.dev';
import { UserModel,  UserTreatmentAttributes, UserCancerTreatmentsAttributes, UserCredentias } from '../../model/user';

@Injectable()
export class AuthService {
  private host: string;
  user: UserModel;
  credentials : UserCredentias;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private http: Http,
    private platform: Platform,
    private facebook: Facebook) {
      this.user = new UserModel();
      this.credentials = new UserCredentias(null, null);
      this.host = ENV.HOST;
  }

  getAllTreatments() : Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.host}/treatment_types`)
        .map((datas) => datas.json())
        .map((datas) => datas.data)
        .map(convertDatasToTreatments)
        .toPromise()
        .then(resolveDatas)
        .catch(rejectDatas)

      function convertDatasToTreatments(datas) {
        return datas.map((data, index) => {
          let treatment = new UserTreatmentAttributes();
          treatment.status = null;
          treatment.treatment_type_id = data.id;
          treatment.treatable_type = data.attributes.name;

          return treatment;
        });
      }

      function resolveDatas(datas) {
        resolve(datas);
      }

      function rejectDatas(datas) {
        reject(datas);
      }
    });
  }

  getAllTypesCancers() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.host}/cancer_types`)
        .map((datas) => datas.json())
        .map((datas) => datas.data)
        .map(convertDatasToTreatments)
        .toPromise()
        .then(resolveDatas)
        .then(rejectDatas)

      function convertDatasToTreatments(datas) {
        return datas.map((data, index) => {
          let cancerType = new UserCancerTreatmentsAttributes();
          cancerType.cancer_type_id = data.id;
          cancerType.cancerous_type = data.attributes.name;

          return cancerType;
        });
      }

      function resolveDatas(datas) {
        resolve(datas);
      }

      function rejectDatas(datas) {
        reject(datas);
      }
    });
  }

  authUserEmail() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password).then((res : any) => {
        console.log(res);
        resolve(res.auth._lat);
      }).catch((error) => {
        reject(error);
      })
    })

  }

  getAuthentication() {
    return this.afAuth.authState;
  }

  getFacebookDatas() {
    return new Promise((resolve, reject) => {
      this.facebook.login(['email', 'public_profile']).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  // signWithFacebook() {
  //   let user = null;
  //   if(this.platform.is('cordova')) {
  //     return this.facebook.login(['email', 'public_profile']).then((res) => {
  //       const facebookCredentials = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //       return firebase.auth().signInWithCredential(facebookCredentials);
  //     })
  //     .then(findUser.bind(this))
  //     .then(verifyIfRegisterUser.bind(this))
  //   } else {
  //     return this.auth.login({
  //       provider: AuthProviders.Facebook,
  //       method: AuthMethods.Popup
  //     })
  //     .then(findUser.bind(this))
  //     .then(verifyIfRegisterUser.bind(this))
  //     .then(updateTokenDevice.bind(this));
  //   }

  //   function findUser(datas) {
  //     user = datas;
  //     return this.userStorageService.findUser(user.uid);
  //   }

  //   function verifyIfRegisterUser(datas) {
  //     if(datas.$value === null) {
  //       return this.userStorageService.registerUser(user.auth, '');
  //     }
  //     return datas;
  //   }

  //   function updateTokenDevice() {
  //     this.userStorageService.updateTokenDevice(user.uid)
  //   }
  // }



  signOut() {
    this.afAuth.auth.signOut();
  }
}
