import { Injectable } from '@angular/core';
import { AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods, AngularFire } from 'angularfire2';
import { UserStorageService } from './user-storage-service';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  private authState : FirebaseAuthState

  constructor(
    public auth: FirebaseAuth,
    public af: AngularFire,
    public userStorageService: UserStorageService,
    public platform: Platform) {
  }

  getAuthentication() {
    return this.auth;
  }

  signWithFacebook() {
    let user = null;
    if(this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then((res) => {
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
      .then(verifyIfRegisterUser.bind(this));
    }

    function findUser(datas) {
      user = datas;
      return this.userStorageService.findUser(user.uid);
    }

    function verifyIfRegisterUser(datas) {
      if(datas.$value === null) {
        this.userStorageService.registerUser(user);
      }
    }
  }

  signUpWithEmail(credentials) {
    let user = credentials;
    return this.af.auth.createUser({
      email: credentials.email,
      password: credentials.password
    }).then((credentials) => {
      this.userStorageService.registerUser(credentials, user);
    });
  }

  signInWithEmail(credentials) {
    return this.af.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    });
  }

  signOut() {
    this.auth.logout();
  }
}
