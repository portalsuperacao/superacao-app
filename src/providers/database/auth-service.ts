import { UserModel } from './../../model/user';
import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, AuthMethods, AngularFire } from 'angularfire2';
import { UserStorageService } from './user-storage-service';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Http, Headers } from '@angular/http';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private af: AngularFire,
    private userStorageService: UserStorageService,
    private platform: Platform,
    private facebook: Facebook,
    private http: Http) { }


  getAuthentication() {
    return this.auth;
  }

  signWithFacebook() {
    let user = null;
    if (this.platform.is('cordova')) {
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
      return this.userStorageService.getUserFromBackEnd(user.uid);
      //return this.userStorageService.findUser(user.uid);
    }

    function verifyIfRegisterUser(datas) {
      if (datas.$value === null) {
        return this.userStorageService.registerUser(user.auth);
      }
      return datas;
    }

    function updateTokenDevice() {
      this.userStorageService.updateTokenDevice(user.uid)
    }
  }

  signUpWithEmail(credentials) {
    console.log("credentials:", credentials)
    return this.af.auth.createUser({
      email: credentials.email,
      password: credentials.password
    }).then((datas) => {
      console.log("data Auth:", datas)
      credentials.uid = datas.auth.uid;
      let user = new UserModel();
      user.name = credentials.name;
      user.email = credentials.email;

      this.userStorageService.sendUserToBackEnd(user);
      //this.userStorageService.registerUser(credentials);
    });
  }

  signInWithEmail(credentials) {
    return this.af.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((user) => {
      console.log("autenticou:", )
      let headers = new Headers()
      user.auth.getToken().then(token => {
        headers.append("Authorization", "Bearer " + token)
      })

      this.userStorageService.getUserFromBackEnd(headers);
      //this.userStorageService.updateTokenDevice(user.uid)
    });
  }

  signOut() {
    this.auth.logout();
  }
}
