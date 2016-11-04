import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ChatPage } from '../../../chat/chat';
import { CalendarPublicEventPage } from '../../../calendar/public-event/public-event';

import { UserStorageService } from '../../../../providers/database/user-storage-service';
import { ChatStorageService } from '../../../../providers/database/chat-storage-service';
import { Utils } from '../../../../providers/util/utils';

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
  notifications = [[]];
  lastMessages = [[]];

  loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public chatStorageService: ChatStorageService,
    public userStorageService: UserStorageService,
    public utils: Utils) {

      for(let i = 0; i < 2; i++) {
        this.lastMessages[i] = [];
        this.notifications[i] = [];
      }

      this.utils.generatePush().then((datas) => {
        console.log("remover o push!");
      }).catch((error) => {

      });
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    this.loading.present();
  }

  ionViewWillEnter() {
    this._updateDatas();
  }

  openPublicEvents(user) {
    this.navCtrl.push(CalendarPublicEventPage, {'user' : user});
  }

  openChat(user1, user2, index, indexTypeUser) {
    this.navCtrl.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chatUid, 'status': 1});

    // === clean notifications ===
    if(this.lastMessages[indexTypeUser][index]) {
      this.chatStorageService.setLocalNotification(user2.$key, this.lastMessages[indexTypeUser][index].$key);
    }
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
      this.lastMessages[indexTypeUser][index] = messages;
      this.notifications[indexTypeUser][index] = false;

      this.chatStorageService.getLocalNotification(userUid).then((data) => {
          this.chatStorageService.getLocalNotification(userUid).then((data) => {
            if(data === null) {
             this.notifications[indexTypeUser][index] = false;

              if(this.lastMessages[indexTypeUser][index]) {
                this.chatStorageService.setLocalNotification(userUid, this.lastMessages[indexTypeUser][index].$key);
              }
            } else if(messages.$key != data) {
              this.notifications[indexTypeUser][index] = true;
            } else {
              this.notifications[indexTypeUser][index] = false;
            }
          });
      });
    });
  }


  _findOvercomer(trinity, index) {
    this.userStorageService.findUserObs(trinity.overcomer).subscribe((overcomer) => {
      this.overcomer[index] = overcomer;

      // ====== CHAT OVERCOMER ======
      this.chatStorageService.getChat(trinity.overcomer, trinity.archangel).then((chatDatas : any) => {
        if(!chatDatas) {
          this.overcomer[index].chatUid = this.chatStorageService.createChat(this.overcomer[index], this.archangel);
          return;
        }

        this.overcomer[index].chatUid = chatDatas.chatUid;
        this._generateNotification(this.overcomer[index].chatUid, trinity.overcomer, index, 0);
      });

      this.loading.dismiss();
    });
  }

  _findAngel(trinity, index) {
    // ====== FIND USER =======
    this.userStorageService.findUser(trinity.angel).then((snapshot) => {
      this.angel[index] = snapshot;

      // ====== CHAT ANGEL ======
      this.chatStorageService.getChat(trinity.angel, trinity.archangel).then((chatDatas : any) => {
        if(!this._verifySameAngel(index) && !chatDatas) {
          this.angel[index].chatUid = this.chatStorageService.createChat(this.angel[index], this.archangel);
          return;
        }

        this.angel[index].chatUid = chatDatas.chatUid;
        this._generateNotification(this.angel[index].chatUid, trinity.angel, index, 1);
      });
    });

  }

  _verifySameAngel(index) {
    let indexOf = 0;
    for(let i = 0; i < this.trinitys.length; i++) {
      if(this.trinitys[i].archangel == this.trinitys[index].archangel) {
        indexOf += 1;
      }
    }

    if(indexOf >= 2 && index > 0) {
      return true;
    }

    return false;
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
