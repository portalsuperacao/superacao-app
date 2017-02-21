import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserStorageService } from '../providers/database/user-storage-service';
import { AuthService } from '../providers/database/auth-service';

import { ArchangelPage } from '../pages/trinity/archangel/archangel';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage;
  mainPage;
  profilePage = ProfilePage;


  constructor(public platform: Platform,
    public menuCtrl: MenuController,
    public userStorageService: UserStorageService,
    public authService : AuthService) {

      platform.ready().then(() => {
        // IF AUTHENTICATION
        this.authService.getAuthentication().subscribe((state) =>{
          if(state !== null) {
            this.menuCtrl.enable(true);
            this.rootPage = TabsPage;
            this.mainPage = TabsPage;
          } else {
            this.menuCtrl.enable(false);
            this.rootPage = LoginPage;
          }
        });

        // this.menuCtrl.enable(true);
        // this.userStorageService.getUser().then((user : any) => {
        //     this._navigationPages(user);
        //     this._updateLastAccess(user);
        // });

        StatusBar.styleDefault();
        Splashscreen.hide();
      });
  }

  openPage(page) {
    this.rootPage = page;
  }

  signOut() {
    this.authService.signOut();
  }

  _navigationPages(user) {
      if(user.type_user == "Arcanjo") {
        this.rootPage = ArchangelPage;
        this.mainPage = ArchangelPage;
      } else {
        this.rootPage = TabsPage;
        this.mainPage = TabsPage;
      }
  }

  _updateLastAccess(user) {
    this.userStorageService.updateLastAccess(new Date().getTime(), user.$key);
  }

  _updateTokenDevice(user) {
    this.userStorageService.updateTokenDevice(user.$key)
  }
}
