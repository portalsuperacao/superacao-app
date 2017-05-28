import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { CalendarPage } from '../calendar/calendar';
import { MySpaceMedicinesPage } from './medicines/medicines';
import { MySpaceNotesPage } from './notes/notes';
import { MySpaceDoctorsPage } from './doctors/doctors';
import { ProfilePage } from '../profile/profile';



@Component({
  selector: 'page-my-space',
  templateUrl: 'my-space.html',
})
export class MySpacePage {
  user;
  calendarPage = CalendarPage;
  medicinesPage = MySpaceMedicinesPage;
  notesPage = MySpaceNotesPage;
  doctorsPage = MySpaceDoctorsPage;
  thumbClass;

  constructor(
    public navCtrl: NavController,
    public userStorageService: UserStorageService) {

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
    this.user.subscribe((datas: any) => {
      if (datas.type_user == 'Superador') {
        this.thumbClass = 'background-color-overcomer';
      } else if (datas.type_user == 'Anjo') {
        this.thumbClass = 'background-color-angel';
      }
    })
  }

  saveOnBackEnd() {
    let user = {
      "pacient": "myself",
      "cancer_status": "during_treatment",
      "participant_profile": {
        "participant_type": "angel",
        "first_name": "Allison",
        "last_name": "Oliveira",
        "occupation": "Corporate Response Specialist",
        "country": "Índia",
        "state": "Tocantins",
        "city": "Município de Nicolasdo Sul",
        "relationship": "Solteira",
        "sons": 4,
        "facebook": "http://swiftbarrows.co/petra",
        "instagram": "http://prohaska.net/luisa",
        "whatsapp": "http://grimetokes.name/norris",
        "youtube": "http://oconnell.info/zoey",
        "snapchat": "http://vonrueden.biz/rhett.hilpert",
        "genre": "other",
        "email": "loyce@hintz.io",
        "belief": "Kaffir Leaves"
      },
      "current_treatment_profile": {
        "metastasis": true,
        "relapse": false,
        "treatments": [
          {
            "status": "done",
            "treatment_type_id": 1
          }
        ]
      }
    }
    this.userStorageService.sendUserToBackEnd(user)
  }

}
