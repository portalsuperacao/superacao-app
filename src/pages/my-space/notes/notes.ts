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
  user : any;
  notes : any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public userStorageService : UserStorageService,
    public mySpaceStorageService: MySpaceStorageService) {

  }

  ionViewDidLoad() {
    this.userStorageService.getUser().then((user) => {
      this.user = user
    }).then(() => {
      this.notes = this.mySpaceStorageService.getNotesEvent(this.user.$key)
    })
  }

  newEvent() {
    let modal = this.modalCtrl.create(MySpaceNotesEventPage);
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) {
        return;
      }

      this.mySpaceStorageService.insertNotesEvent(this.user.$key, data).then(() => {
        this.notes = this.mySpaceStorageService.getNotesEvent(this.user.$key)
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
            this.mySpaceStorageService.removeNotesEvent(this.user.$key, note).then(() => {
              this.notes = this.mySpaceStorageService.getNotesEvent(this.user.$key)
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

      this.mySpaceStorageService.updateNotesEvent(this.user.$key, data).then(() => {
        this.notes = this.mySpaceStorageService.getNotesEvent(this.user.$key)
      });
    });
  }


}
