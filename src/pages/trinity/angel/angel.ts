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

  lastMessages = [[]];
  notifications = [[]];

  loading;

  constructor(
    public nav: NavController,
    public userStorageService: UserStorageService,
    public chatStorageService: ChatStorageService,
    public utils: Utils,
    public loadingCtrl: LoadingController) {

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

  openHelpSystem() {
    //this.nav.push(OvercomerHelpSystemPage);
  }

  openPublicEvents(user) {
    this.nav.push(CalendarPublicEventPage, {'user' : user});
  }

  openChat(user1, user2, index, indexTypeUser) {
    this.nav.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chatUid, 'status': 1});

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

    this.loading.dismiss();
  }

  _findArchangel(trinity, index) {
    this.userStorageService.findUser(trinity.archangel).then((snapshot) => {
      this.archangel[index] = snapshot;

      // ====== CHAT ARCHANGEL ======
      this.chatStorageService.getChat(trinity.angel, trinity.archangel).then((chatDatas : any) => {

        if(!this._verifySameArchangel(index) && !chatDatas) {
          this.archangel[index].chatUid = this.chatStorageService.createChat(this.angel, this.archangel[index]);
          return;
        }

        this.archangel[index].chatUid = chatDatas.chatUid;
        this._generateNotification(this.archangel[index].chatUid, trinity.archangel, index, 1);
      });
    });
  }

  _verifySameArchangel(index) {
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
