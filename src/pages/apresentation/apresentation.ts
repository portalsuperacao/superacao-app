import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { ArchangelPage } from '../trinity/archangel/archangel';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-apresentation',
  templateUrl: 'apresentation.html'
})
export class ApresentationPage {
  userDatas;
  rootPage;

  constructor(public navCtrl: NavController, public userStorageService: UserStorageService) {
    this.userStorageService.getUser().then((user : any) => {
      if(user.type_user == "Arcanjo") {
        this.rootPage = ArchangelPage
      } else {
        this.rootPage = TabsPage;
      }
    });
  }

  ionViewDidLoad() {
    this.userDatas = this.userStorageService.getUser();
  }

  closePage() {
    this.navCtrl.setRoot(this.rootPage);
  }

}
