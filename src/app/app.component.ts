import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { UserStorageService } from '../providers/database/user-storage-service';
import { AuthService } from '../providers/database/auth-service';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthPage } from '../pages/auth/auth';
//import { LoginPage } from '../pages/login/login';
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
    private platform: Platform,
    private menuCtrl: MenuController,
    private userStorageService: UserStorageService,
    private authService : AuthService,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar
  ) {

    platform.ready().then(() => {
      this.authService.getAuthentication().subscribe((state) =>{
        if(state !== null) {
          this.menuCtrl.enable(true);
          this.rootPage = TabsPage;
        } else {
          this.menuCtrl.enable(false);
          this.rootPage = AuthPage;
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private _updateLastAccess(user) {
    this.userStorageService.updateLastAccess(new Date().getTime(), user.$key);
  }

  openPage(page) {
    this.rootPage = page;
  }

  signOut() {
    this.authService.signOut();
  }


}
