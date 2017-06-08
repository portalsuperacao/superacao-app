import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthProviders, AngularFireAuth, AuthMethods, AngularFire } from 'angularfire2';
import { Observable } from 'rjxs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { ENV } from '../../config/environment.dev';
import { UserModel,  UserTreatmentAttributes, UserCancerTreatmentsAttributes } from '../../model/user';
import { UserStorageService } from './user-storage-service';

@Injectable()
export class AuthService {
  private host: string;
  user: any;

  constructor(
    private auth: AngularFireAuth,
    private af: AngularFire,
    private http: Http,
    private userStorageService: UserStorageService,
    private platform: Platform,
    private facebook: Facebook) {
      this.user = new UserModel();
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

  getAuthentication() {
    return this.auth;
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

  signWithFacebook() {
    let user = null;
    if(this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then((res) => {
        const facebookCredentials = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredentials);
      })
      .then(findUser.bind(this))
      .then(verifyIfRegisterUser.bind(this))
    } else {
      return this.auth.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      })
      .then(findUser.bind(this))
      .then(verifyIfRegisterUser.bind(this))
      .then(updateTokenDevice.bind(this));
    }

    function findUser(datas) {
      user = datas;
      return this.userStorageService.findUser(user.uid);
    }

    function verifyIfRegisterUser(datas) {
      if(datas.$value === null) {
        return this.userStorageService.registerUser(user.auth);
      }
      return datas;
    }

    function updateTokenDevice() {
      this.userStorageService.updateTokenDevice(user.uid)
    }
  }

  signUpWithEmail(credentials) {
    return this.af.auth.createUser({
      email: credentials.email,
      password: credentials.password
    }).then((datas) => {
      credentials.uid = datas.auth.uid;
      this.userStorageService.registerUser(credentials);
    });
  }

  signInWithEmail(credentials) {
    return this.af.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((user) => {
      this.userStorageService.updateTokenDevice(user.uid)
    });
  }

  signOut() {
    this.auth.logout();
  }
}
