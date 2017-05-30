import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { CalendarPage } from './calendar/calendar';
import { MySpaceMedicinesPage } from './medicines/medicines';
import { MySpaceNotesPage } from './notes/notes';
import { MySpaceDoctorsPage } from './doctors/doctors';
import { ProfilePage } from '../profile/profile';



@Component({
  selector: 'page-my-space',
  templateUrl: 'my-space.html'
})
export class MySpacePage {
  user;
  calendarPage = CalendarPage;
  medicinesPage =  MySpaceMedicinesPage;
  notesPage = MySpaceNotesPage;
  doctorsPage = MySpaceDoctorsPage;
  thumbClass;

  constructor(
    public navCtrl: NavController,
    public userStorageService : UserStorageService) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
    this._verifyClassOfThumb()
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openProfile() {
    this.navCtrl.push(ProfilePage)
  }

  private _verifyClassOfThumb() {
    this.user.subscribe((datas : any) => {
      if(datas.type_user == 'Superador') {
        this.thumbClass = 'background-color-overcomer';
      } else if (datas.type_user == 'Anjo') {
        this.thumbClass = 'background-color-angel';
      }
    })
  }

}
