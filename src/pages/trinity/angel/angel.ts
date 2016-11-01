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

  ionViewWillEnter() {
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
    this.chatStorageService.setLocalNotification(user2.$key, this.lastMessages[index].$key);
  }

  toggleSpace() {
    if(this.space == 'open') {
      this.space = 'close';
    } else {
      this.space = 'open';
    }
  }


  _generateNotification(chatUid, userUid, index, indexTypeUser) {
    this.chatStorageService.getLastMessage(chatUid, userUid).subscribe((messages : any) => {
      if(indexTypeUser == 0) {
        this.lastMessages[index] = messages;
      }

       this.chatStorageService.getLocalNotification(userUid).then((data) => {
         console.log(data);
         console.log(indexTypeUser + " " + messages.$key);
         if(data === null) {
           if(indexTypeUser == 0) {
             this.notifications[index] = { overcomer : false }
           } else if (indexTypeUser == 1) {
             this.notifications[index] = { archangel : false }
           }

           //this.chatStorageService.setLocalNotification(userUid, this.lastMessages[index].$key);

          } else if(messages.$key != data) {
            console.log("entrou!");
            if(indexTypeUser == 0) {
              this.notifications[index] = { overcomer : true }
            } else if (indexTypeUser == 1) {
              this.notifications[index] = { archangel : true }
            }
            console.log(this.notifications[index]);

          } else {
            if(indexTypeUser == 0) {
              this.notifications[index] = { overcomer : false }
            } else if (indexTypeUser == 1) {
              this.notifications[index] = { archangel : false }
            }
          }

       });
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
        this._generateNotification(this.overcomer[index].chatUid, trinity.overcomer, index, 0);
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
        this._generateNotification(this.archangel[index].chatUid, trinity.archangel, index, 1);
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
