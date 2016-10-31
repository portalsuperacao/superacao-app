import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserStorageService } from '../providers/database/user-storage-service';
import { DateUtil } from '../providers/util/date-util';
import * as firebase from 'firebase';

import { ApresentationPage } from '../pages/apresentation/apresentation';
import { ArchangelPage } from '../pages/trinity/archangel/archangel';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.component.html'
})


export class MyApp {
  rootPage;
  mainPage;
  profilePage = ProfilePage;


  constructor(platform: Platform,
    public menuCtrl: MenuController,
    public userStorageService: UserStorageService,
    public dateUtil: DateUtil) {

      platform.ready().then(() => {

        // ====== IF AUTHENTICATION =====
        firebase.auth().onAuthStateChanged((auth) => {
          if(!auth) {
            this.menuCtrl.enable(false);
            this.rootPage = LoginPage;
            return;
          }

          // ========== NAVIGATION PAGES ============
          this.userStorageService.getUser().then((user : any) => {
            this.menuCtrl.enable(true);
              let dateNow = this.dateUtil.formatDateBR(new Date());
              let dateUser = this.dateUtil.formatDateBR(new Date(user.last_access));

              if(dateUser === dateNow) {
                if(user.type_user == "Arcanjo") {
                  this.rootPage = ArchangelPage;
                  this.mainPage = ArchangelPage;
                  return;
                }

                this.rootPage = TabsPage;
                this.mainPage = TabsPage;
                return;
              }

              // ==== UPDATE DATAS OF LAST ACESSS
              this.userStorageService.updateLastAccess(new Date().getTime(), user.$key);

              this.userStorageService.setEmotion({
                status: "Normal",
                img: "./assets/images/happy.svg",
                is_active: 0
              }, user.$key);

              this.rootPage = ApresentationPage;

            });
          });



      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.rootPage = page;
  }

  logout() {
    firebase.auth().signOut()
    this.userStorageService.clear();
  }
}
