
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { ENV } from '../../config/environment.dev';
import { UserStorageService } from './user-storage.service';
import { UserModel,  UserTreatmentAttributes, UserCancerTreatmentsAttributes } from '../../model/user';

@Injectable()

export class AuthService {
  private host: string;
  user: UserModel;
  authToken: string;
  authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private http: Http,
    private platform: Platform,
    private facebook: Facebook,
    private userStorageService: UserStorageService
    ) {
      this.user = new UserModel();
      this.host = ENV.HOST;
      this.authState = {
        firebase: null,
        backend: null
      }
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
    return new Observable((subject) => {
      this.afAuth.authState.subscribe((state) => {
        Promise.resolve(state)
          .then(verifyIfIsAuth.bind(this))
          .then(getAuthToken.bind(this))
          .then(verifyIfUserRegister.bind(this))
          .then(finishPromise.bind(this))
          .catch(finishPromise.bind(this))
      })

      function verifyIfIsAuth(state) {
        return new Promise((resolve, reject) => {
          if(state) {
            this.authState.firebase = true;
            resolve(true);
          } else {
            this.authState.firebase = false;
            reject(false);
          }
        })

      }

      function getAuthToken() {
        return this.afAuth.auth.currentUser.getToken().then((token) => {
          this.authToken = token
          this.userStorageService.authToken = token
        });
      }

      function verifyIfUserRegister() {
        return new Promise((resolve, reject) => {
          this.userStorageService.getUser().subscribe(
            (user) => { resolve(true); },
            (error) => { reject(error); }
          )
        });
      }

      function finishPromise(state) {
        this.authState.backend = state
        subject.next(this.authState)
      }

    })
  }

  authUserEmail(email, password) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((res : any) => {
        console.log(res);
      }).catch((error) => {
        reject(error);
      })
    })
  }

  authUserFacebook() {
    if(this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then((res) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    } else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }

  createUserWithEmail(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  getAuthUserDatas() {
    return this.afAuth.auth.currentUser;
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
