import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { CalendarPage } from '../calendar/calendar';
import { MySpaceMedicinesPage } from './medicines/medicines';
import { MySpaceNotesPage } from './notes/notes';
import { MySpaceDoctorsPage } from './doctors/doctors';



@Component({
  selector: 'page-my-space',
  templateUrl: 'my-space.html'
})
export class MySpacePage {
  user
  calendarPage = CalendarPage;
  medicinesPage =  MySpaceMedicinesPage;
  notesPage = MySpaceNotesPage;
  doctorsPage = MySpaceDoctorsPage;

  constructor(public navCtrl: NavController, public userStorageService : UserStorageService) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
