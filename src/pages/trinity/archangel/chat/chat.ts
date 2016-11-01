import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../../../chat/chat';
import { CalendarPublicEventPage } from '../../../calendar/public-event/public-event';

import { UserStorageService } from '../../../../providers/database/user-storage-service';
import { ChatStorageService } from '../../../../providers/database/chat-storage-service';

@Component({
  selector: 'page-archangel-chat',
  templateUrl: 'archangel-chat.html',
})


export class ArchangelChatPage {

  trinitys;
  overcomer = [];
  angel = [];
  archangel;
  space = 'close';

  countMessages = [];
  notifications = [];
  lastMessages = [];

  countMessages2 = [];
  notifications2 = [];

  constructor(
    public navCtrl: NavController,
    public chatStorageService: ChatStorageService,
    public userStorageService: UserStorageService) {

  }
  ionViewWillEnter() {
    this._updateDatas();
  }

  openPublicEvents(user) {
    this.navCtrl.push(CalendarPublicEventPage, {'user' : user});
  }

  openChat(user1, user2, index) {
    this.navCtrl.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chatUid, 'status': 1});

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
         if(data === null) {
           if(indexTypeUser == 0) {
             this.notifications[index] = { overcomer : false }
           } else {
             this.notifications[index] = { angel : false }
           }

           this.chatStorageService.setLocalNotification(userUid, this.lastMessages[index].$key);

          } else if(messages.$key != data) {
            if(indexTypeUser == 0) {
              this.notifications[index] = { overcomer : true }
            } else {
              this.notifications[index] = { angel : true }
            }

          } else {
            if(indexTypeUser == 0) {
              this.notifications[index] = { overcomer : false }
            } else {
              this.notifications[index] = { angel : false }
            }
          }
       });
    });
  }


  _findOvercomer(trinity, index) {
    this.userStorageService.findUserObs(trinity.overcomer).subscribe((overcomer) => {
      this.overcomer[index] = overcomer;

      // ====== CHAT OVERCOMER ======
      this.chatStorageService.getChat(trinity.overcomer, trinity.archangel).then((chatDatas : any) => {
        if(!chatDatas) {
          console.log("superador!");
          console.log(chatDatas);

          this.overcomer[index].chatUid = this.chatStorageService.createChat(this.overcomer[index], this.archangel);
          return;
        }

        this.overcomer[index].chatUid = chatDatas.chatUid;
        this._generateNotification(this.overcomer[index].chatUid, trinity.overcomer, index, 0);
      });
    });
  }

  _findAngel(trinity, index) {
    // ====== FIND USER =======
    this.userStorageService.findUser(trinity.angel).then((snapshot) => {
      this.angel[index] = snapshot;

      // ====== CHAT ANGEL ======
      this.chatStorageService.getChat(trinity.angel, trinity.archangel).then((chatDatas : any) => {
        if(!chatDatas) {
          console.log("anjo!");
          console.log(chatDatas);
          this.angel[index].chatUid = this.chatStorageService.createChat(this.angel[index], this.archangel);
          return;
        }

        this.angel[index].chatUid = chatDatas.chatUid;
        this._generateNotification(this.angel[index].chatUid, trinity.angel, index, 1);
      });
    });

  }


  _updateDatas() {
    this.userStorageService.getUser().then((user : any) => {
      this.archangel = user;

      this.trinitys = [{
        archangel : user.$key,
        angel: "c9Em4kqXqQY6Rx0OHgnTsRpvrQi1",
        overcomer: "HyAqq0wlb2QxF7uqKlLhPAiEVPE3"
      },
      {
        archangel : user.$key,
        angel: "c9Em4kqXqQY6Rx0OHgnTsRpvrQi1",
        overcomer: "zua3bsHHBkTPUhbyRC5k5xHam8V2",
      }];

      this.trinitys.forEach((trinity, index) => {
        this._findOvercomer(trinity, index);
        this._findAngel(trinity, index);
      });
    });
  }


}
