import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { ChatStorageService } from '../../../providers/database/chat-storage-service';
import { Utils } from '../../../providers/util/utils';

import { CalendarPublicEventPage } from '../../my-space/calendar/public-event/public-event';
import { ChatPage } from '../../chat/chat';



@Component({
  selector: 'page-angel',
  templateUrl: 'angel.html',
})
export class AngelPage {

  trinitys;
  overcomerNotification: any = [];
  archangelNotification: any = [];
  verifyNetwork: boolean = true;

  constructor(
    public nav: NavController,
    public userStorageService: UserStorageService,
    public chatStorageService: ChatStorageService,
    public utils: Utils,
    public loadingCtrl: LoadingController,
    public network: Network) {

    }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loading.present();
    this.trinitys = this.updateDatas();
    this.trinitys.then((users) => {
      users.forEach((user, i) => {
        this.overcomerNotification[i] = user.overcomer.chat.view;
        this.archangelNotification[i] =  user.archangel.chat.view;
      });
      loading.dismiss();
    });
  }

  openHelpSystem() {
    //this.nav.push(OvercomerHelpSystemPage);
  }

  openPublicEvents(user) {
    this.nav.push(CalendarPublicEventPage, {'user' : user});
  }

  openChat(user1, user2) {
    this.nav.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chat, 'status': 1});
  }

  updateDatas() {
    return new Promise((resolve) => {
      Promise.resolve()
      .then(getTrinityService)
      .then(loopThroughTrinitys.bind(this))

      function getTrinityService() {
        let trinitys = [{
          overcomer : "b9bThtz6vXbSSC5Gn4WvWwG5UsR2",
          angel: "",
          archangel: "hLcd2QHiz0R3WsZsUnAF3NTwhUD2"
        }];

        return trinitys;
      }

      function loopThroughTrinitys(trinitys) {
          for(let i = 0; i < trinitys.length; i++) {
            Promise.resolve(trinitys[i])
            .then(verifyIfHaveConnect.bind(this))
            .then(findOvercomer.bind(this))
            .then(findAngel.bind(this))
            .then(findArchangel.bind(this))
            .then(validateChatOvercomer.bind(this))
            .then(validateChatArchangel.bind(this))
            .then(getChatOvercomer.bind(this))
            .then(getChatArchangel.bind(this))
            .then(getNotificationChatOvercomer.bind(this))
            .then(getNotificationChatArchangel.bind(this))
            .then(getLastMessages.bind(this))
            .then((trinity) => {
              if(i === (trinitys.length - 1)) {
                resolve(trinitys);
              }
            });
          }
      }

      function verifyIfHaveConnect(trinity) {
        this.network.onDisconnect().subscribe(() => {
          this.verifyNetwork = false;
        });
        this.network.onConnect().subscribe(() => {
          this.verifyNetwork = true;
        });

        return trinity;
      }

      function findOvercomer(trinity) {
        return this.userStorageService.findUser(trinity.overcomer).then((user) => {
          trinity.overcomer = user;
          return trinity;
        })
      }

      function findAngel(trinity) {
        return this.userStorageService.getUser().then((user) => {
          trinity.angel = user;
          return trinity;
        });
      }

      function findArchangel(trinity) {
        return trinity.archangel = this.userStorageService.findUser(trinity.archangel).then((user) => {
          trinity.archangel = user;
          return trinity;
        });
      }

      function validateChatOvercomer(trinity) {
        return this.chatStorageService.getChat(trinity.overcomer.$key, trinity.angel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.overcomer.chat = this.chatStorageService.createChat(trinity.overcomer, trinity.angel).chatUid;
          } else {
            trinity.overcomer.chat = chatDatas.chatUid;
          }
          return trinity;
        });
      }

      function validateChatArchangel(trinity) {
        return this.chatStorageService.getChat(trinity.angel.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.archangel.chat = this.chatStorageService.createChat(trinity.angel, trinity.archangel).chatUid;
          } else {
            trinity.archangel.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function getChatOvercomer(trinity) {
        return this.chatStorageService.getChatUsers(trinity.overcomer.chat).then((chat) => {
          trinity.overcomer.chat = chat;
          return trinity;
        })
      }

      function getChatArchangel(trinity) {
        return this.chatStorageService.getChatUsers(trinity.archangel.chat).then((chat) => {
          trinity.archangel.chat = chat;
          return trinity;
        })
      }

      function getNotificationChatOvercomer(trinity) {
        for(let i = 0; i < trinity.overcomer.chat.users.length; i++) {
          if(trinity.overcomer.chat.users[i].uid == trinity.overcomer.$key) {
            trinity.overcomer.chat.view = this.chatStorageService.getChatDatasObs(trinity.overcomer.chat.$key, i);
          }
        }

        return trinity;
      }

      function getNotificationChatArchangel(trinity) {
        for(let i = 0; i < trinity.archangel.chat.users.length; i++) {
          if(trinity.archangel.chat.users[i].uid == trinity.archangel.$key) {
            trinity.archangel.chat.view = this.chatStorageService.getChatDatasObs(trinity.archangel.chat.$key, i);
          }
        }

        return trinity;
      }

      function getLastMessages(trinity) {
        trinity.overcomer.lastMessages = this.chatStorageService.getLastMessage(trinity.overcomer.chat.chatUid, trinity.overcomer.$key);
        trinity.archangel.lastMessages = this.chatStorageService.getLastMessage(trinity.archangel.chat.chatUid, trinity.archangel.$key);
        return trinity;
      }
    });
  }




}
