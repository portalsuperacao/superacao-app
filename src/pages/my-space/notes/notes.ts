import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { MySpaceNotesEventPage } from './event/notes-event';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { MySpaceStorageService } from '../../../providers/database/my-space-storage-service';


@Component({
  selector: 'page-my-space-notes',
  templateUrl: 'notes.html'
})
export class MySpaceNotesPage {
  user;
  notes;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public userStorageService : UserStorageService,
    public mySpaceStorageService: MySpaceStorageService) {

  }

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();

    this.user.subscribe((user) => {
      this.notes = this.mySpaceStorageService.getNotes(user.$key);
    });
  }

  newEvent() {
    let modal = this.modalCtrl.create(MySpaceNotesEventPage);
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) {
        return;
      }

      this.user.subscribe((user) => {
        this.mySpaceStorageService.insertNotes(user.$key, data);
      });
    });
  }

  removeEvent(note) {
    let alert = this.alertCtrl.create({
      title: "Deseja remover?",
      message: "Você deseja mesmo a nota " + note.title + " ?",
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.user.subscribe((user) => {
              this.mySpaceStorageService.removeNotes(user.$key, note);
            });
          }
        },
        {
          text: 'Não'
        }
      ]
    });

    alert.present();
  }

  editEvent(note) {
    let modal = this.modalCtrl.create(MySpaceNotesEventPage, {"note" : note});
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) {
        return;
      }
      
      this.user.subscribe((user) => {
        this.mySpaceStorageService.updateNotes(user.$key, data);
      });
    });

  }


}
