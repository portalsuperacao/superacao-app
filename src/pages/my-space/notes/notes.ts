import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';


@Component({
  selector: 'page-my-space-notes',
  templateUrl: 'notes.html'
})
export class MySpaceNotesPage {
  user

  constructor(public navCtrl: NavController, public userStorageService : UserStorageService) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
  }

}
