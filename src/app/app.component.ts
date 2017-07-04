import { Component } from '@angular/core';
import { Platform, MenuController, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { UserStorageService } from '../providers/database/user-storage.service';
import { AuthService } from '../providers/database/auth.service';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthPage } from '../pages/auth/auth';
import { AuthRegisterBasicDatasPage } from '../pages/auth/register/basic-datas/basic-datas';
import { ProfilePage } from '../pages/profile/profile';


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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController
  ) {

    platform.ready().then(() => {
      this.verifyWhichPageOpen();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  verifyWhichPageOpen() {
    this.authService.getAuthentication().subscribe((state : any) =>{
      this.rootPage = AuthPage;
      if(state.firebase === true) {
        if(state.backend === true) {
          this.menuCtrl.enable(true);
          this.rootPage = TabsPage;
        } else if(state.backend === false) {
          this.menuCtrl.enable(true);
          this.rootPage = AuthRegisterBasicDatasPage;
        } else {
          this.menuCtrl.enable(false);
          this.showMessageError();
          this.rootPage = AuthPage;
        }
      } else {
        this.menuCtrl.enable(false);
        this.rootPage = AuthPage;
      }

    });
  }

  showMessageError() {
    let alert = this.alertCtrl.create({
      title: 'Ops! Não conseguimos conectar',
      subTitle: 'Ocorreu um problema ao tentar conectar com o servidor!',
      buttons: ['Ok']
    })

    alert.present();
  }

  openPage(page) {
    this.rootPage = page;
  }

  signOut() {
    this.authService.signOut();
  }


}
