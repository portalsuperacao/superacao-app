import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserStorageService } from '../providers/database/user-storage-service';
import { AuthService } from '../providers/database/auth-service';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterBasicDatas } from '../pages/register/basic-datas/basic-datas';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage : any;
  mainPage : any = TabsPage;
  profilePage : any = ProfilePage;

  constructor(
    public platform: Platform,
    public menuCtrl: MenuController,
    public userStorageService: UserStorageService,
    public authService : AuthService) {

      platform.ready().then(() => {
        this.authService.getAuthentication().subscribe((state) =>{
          if(state !== null) {
            this.menuCtrl.enable(true);
            this.rootPage = TabsPage;
          } else {
            this.menuCtrl.enable(false);
            this.rootPage = LoginPage;
          }
        });

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

  _updateLastAccess(user) {
    this.userStorageService.updateLastAccess(new Date().getTime(), user.$key);
  }
}
