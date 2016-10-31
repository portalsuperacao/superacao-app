import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { ChatStorageService } from '../../../providers/database/chat-storage-service';
import { Utils } from '../../../providers/util/utils';

import { ChatPage } from '../../chat/chat';
import { CalendarPublicEventPage } from '../../calendar/public-event/public-event';
import { StatusEmotionPage } from '../../status-emotion/status-emotion';
//import { OvercomerHelpSystemPage } from '../../overcomer-help-system/overcomer-help-system';



@Component({
  selector: 'page-overcomer',
  templateUrl: 'overcomer.html',
})
export class OvercomerPage {

  //==== Trinity =====
  trinity;
  overcomer;
  angel;
  archangel;

  lastMessages;
  notifications = [];

  constructor(
    public navCtrl: NavController,
    public userStorageService: UserStorageService,
    public chatStorageService: ChatStorageService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public utils: Utils) {

      this.utils.generatePush().then((datas) => {
        console.log("remover o push!");
      }).catch((error) => {

      });
    }

  ionViewDidLoad() {
    this._updateDatas();
  }

  openStatusEmotion() {
    let modal = this.modalCtrl.create(StatusEmotionPage);
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) {
        return;
      }

      this.userStorageService.setEmotion(data, this.overcomer.$key);
    })
  }

  openHelpSystem() {
    //this.nav.push(OvercomerHelpSystemPage);
  }

  openChat(user1, user2) {
    this.navCtrl.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chatUid});

    // === clean notifications ===
    this.chatStorageService.setLocalNotification(user2.$key, this.lastMessages.$key);
  }

  openPublicEvents(user) {
    this.navCtrl.push(CalendarPublicEventPage, {'user' : user});
  }

  _generateNotification(chatUid, userUid, indexTypeUser) {
    this.chatStorageService.getLastMessage(chatUid, userUid).subscribe((messages : any) => {
      this.lastMessages = messages;

       this.chatStorageService.getLocalNotification(userUid).then((data) => {
          console.log(data);
          if(messages.$key != data) {
            this.notifications[indexTypeUser] = true;
            return;
          }

       });
    });
  }

  _findAngel() {
    this.userStorageService.findUser(this.trinity.angel).then((snapshots) => {
      this.angel = snapshots;

      // ====== CHAT ANGEL ======
      this.chatStorageService.getChat(this.trinity.overcomer, this.trinity.angel).then((chatDatas : any) => {
        if(!chatDatas) {
          console.log("superador - anjo!");
          this.angel.chatUid = this.chatStorageService.createChat(this.overcomer, this.angel);
          return;
        }

        this.angel.chatUid = chatDatas.chatUid;
        this._generateNotification(this.angel.chatUid, this.trinity.angel, 0);

      });
    });
  }

  _findArchangel() {
    this.userStorageService.findUser(this.trinity.archangel).then((snapshots) => {
      this.archangel = snapshots;

      // ====== CHAT ARCHANGEL ======
      this.chatStorageService.getChat(this.trinity.overcomer, this.trinity.archangel).then((chatDatas : any) => {
        if(!chatDatas) {
          console.log("superador - arcanjo!");
          this.archangel.chatUid = this.chatStorageService.createChat(this.overcomer, this.archangel);
          return;
        }

        this.archangel.chatUid = chatDatas.chatUid;
        this._generateNotification(this.archangel.chatUid, this.trinity.archangel, 1);
      });
    });
  }


  _updateDatas() {
    this.userStorageService.getUserObs().subscribe((user) => {
      this.overcomer = user;
    });

    this.userStorageService.getUser().then((user : any) => {
      this.trinity = {
        overcomer : user.$key,
        angel: "c9Em4kqXqQY6Rx0OHgnTsRpvrQi1",
        archangel: "NePUY0RoAfPSgAnCTn42IOHSBE72"
      };

      this._findAngel();
      this._findArchangel();
    });

    }

}
