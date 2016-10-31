import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { ChatStorageService } from '../../../providers/database/chat-storage-service';
import { Utils } from '../../../providers/util/utils';

import { CalendarPublicEventPage } from '../../calendar/public-event/public-event';
import { ChatPage } from '../../chat/chat';



@Component({
  selector: 'page-angel',
  templateUrl: 'angel.html',
})
export class AngelPage {

  //==== Trinity =====
  trinitys;
  overcomer = [];
  angel;
  archangel = [];
  space = 'close';

  lastMessages = [];
  notifications = [];
  countMessages = [];

  countMessages2 = [];
  notifications2 = [];

  constructor(
    public nav: NavController,
    public userStorageService: UserStorageService,
    public chatStorageService: ChatStorageService,
    public utils: Utils,
    public loadingCtrl: LoadingController) {
      this.utils.generatePush().then((datas) => {
        console.log("remover o push!");
      }).catch((error) => {

      });
    }

  ionViewDidLoad() {
    this._updateDatas();
  }

  openHelpSystem() {
    //this.nav.push(OvercomerHelpSystemPage);
  }

  openPublicEvents(user) {
    this.nav.push(CalendarPublicEventPage, {'user' : user});
  }

  openChat(user1, user2, index) {
    this.nav.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chatUid, 'status': 1});

    // === clean notifications ===
    this.chatStorageService.setLocalNotification(user2.$key, false);
    this.countMessages[index] = 0;
    this.countMessages2[index] = 0;
    this.notifications[index] = false;
    this.notifications2[index] = false;
  }

  toggleSpace() {
    if(this.space == 'open') {
      this.space = 'close';
    } else {
      this.space = 'open';
    }
  }


  _generateNotification(chatUid, userUid, index) {
    this.countMessages[index] = 0;

    this.chatStorageService.getLocalNotification(userUid).then((data) => {
      this.notifications[index] = data;
    });

    this.chatStorageService.getLastMessage(chatUid, userUid).subscribe((messages : any) => {
      this.lastMessages[index] = messages;

       if(this.countMessages[index] > 0) {
          this.notifications[index] = true;
          this.chatStorageService.setLocalNotification(userUid, true);
        }

       this.countMessages[index]++;
    });
  }

  _generateNotification2(chatUid, userUid, index) {
    this.countMessages2[index] = 0;

    this.chatStorageService.getLocalNotification(userUid).then((data) => {
      this.notifications2[index] = data;
    });

    this.chatStorageService.getLastMessage(chatUid, userUid).subscribe((messages : any) => {

       if(this.countMessages2[index] > 0) {
          this.notifications2[index] = true;
          this.chatStorageService.setLocalNotification(userUid, true);
        }

       this.countMessages2[index]++;
    });
  }

  _findOvercomer(trinity, index) {
    this.userStorageService.findUserObs(trinity.overcomer).subscribe((overcomer) => {
      this.overcomer[index] = overcomer;

      // ====== CHAT OVERCOMER ======
      this.chatStorageService.getChat(trinity.overcomer, trinity.angel).then((chatDatas : any) => {
        if(!chatDatas) {
          console.log("anjo - superador!");
          this.overcomer[index].chatUid = this.chatStorageService.createChat(this.overcomer[index], this.angel);
          return;
        }

        this.overcomer[index].chatUid = chatDatas.chatUid;
        this._generateNotification(this.overcomer[index].chatUid, trinity.overcomer, index);
      });
    });
  }

  _findArchangel(trinity, index) {
    this.userStorageService.findUser(trinity.archangel).then((snapshot) => {
      this.archangel[index] = snapshot;

      // ====== CHAT ARCHANGEL ======
      this.chatStorageService.getChat(trinity.angel, trinity.archangel).then((chatDatas : any) => {
        if(!chatDatas) {
          console.log("anjo - arcanjo!");
          this.archangel[index].chatUid = this.chatStorageService.createChat(this.angel, this.archangel[index]);
          return;
        }

        this.archangel[index].chatUid = chatDatas.chatUid;
        this._generateNotification2(this.archangel[index].chatUid, trinity.archangel, index);
      });
    });
  }


  _updateDatas() {
    this.userStorageService.getUser().then((user : any) => {
      this.angel = user;

      this.trinitys = [{
        angel : user.$key,
        overcomer: "HyAqq0wlb2QxF7uqKlLhPAiEVPE3",
        archangel: "NePUY0RoAfPSgAnCTn42IOHSBE72"
      },
      {
        angel : user.$key,
        overcomer: "zua3bsHHBkTPUhbyRC5k5xHam8V2",
        archangel: "NePUY0RoAfPSgAnCTn42IOHSBE72"
      }];

      this.trinitys.forEach((trinity, index) => {
        this._findOvercomer(trinity, index);
        this._findArchangel(trinity, index);
      });
    });
  }



}
