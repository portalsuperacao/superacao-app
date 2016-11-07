import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';


@Component({
  selector: 'page-my-space-doctors',
  templateUrl: 'doctors.html'
})
export class MySpaceDoctorsPage {
  user

  constructor(public navCtrl: NavController, public userStorageService : UserStorageService) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
  }

}
