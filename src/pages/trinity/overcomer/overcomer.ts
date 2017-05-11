import { Network } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { UserStorageService } from '../../../providers/database/user-storage-service';
import { ChatStorageService } from '../../../providers/database/chat-storage-service';
import { Utils } from '../../../providers/util/utils';

import { ChatPage } from '../../chat/chat';
import { CalendarPublicEventPage } from '../../calendar/public-event/public-event';
import { StatusEmotionPage } from '../../status-emotion/status-emotion';


@Component({
  selector: 'page-overcomer',
  templateUrl: 'overcomer.html',
})

export class OvercomerPage {

  //==== Trinity =====
  overcomerObs: any;
  overcomer: any;
  angel: any;
  archangel: any;
  angelNotification: any;
  archangelNotification: any;
  verifyNetwork: boolean = true;
  loading;

  constructor(
    public navCtrl: NavController,
    public userStorageService: UserStorageService,
    public chatStorageService: ChatStorageService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public utils: Utils) {}

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: "Carregando..."
    });

    this.loading.present();
    this.updateDatas().then((datas : any) => {
      this.overcomerObs = datas.user;
      this.overcomer = datas.trinity.overcomer;
      this.angel = datas.trinity.angel;
      this.archangel = datas.trinity.archangel;
      this.angelNotification = datas.trinity.angel.chat.view;
      this.archangelNotification = datas.trinity.archangel.chat.view;
      this.loading.dismiss();
    });
  }

  openStatusEmotion() {
    let modal = this.modalCtrl.create(StatusEmotionPage);
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) return;
      this.userStorageService.setEmotion(data, this.overcomer.$key);
    });
  }

  openHelpSystem() {
    //this.nav.push(OvercomerHelpSystemPage);
  }

  openChat(user1, user2) {
    this.navCtrl.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chat});
  }

  openPublicEvents(user) {
    this.navCtrl.push(CalendarPublicEventPage, {'user' : user});
  }

  verifyIfHaveConnect() {
    Network.onDisconnect().subscribe(() => {
      this.verifyNetwork = false;
    });
    Network.onConnect().subscribe(() => {
      console.log(123);
      this.verifyNetwork = true;
    });
  }

  updateDatas() {
    return new Promise((resolve) => {
      Promise.resolve()
      //.then(verifyIfHaveConnect.bind(this))
      .then(getTrinityService.bind(this))
      .then(findOvercomer.bind(this))
      .then(findAngel.bind(this))
      .then(findArchangel.bind(this))
      .then(validateChatAngel.bind(this))
      .then(validateChatArchangel.bind(this))
      .then(getChatAngel.bind(this))
      .then(getChatArchangel.bind(this))
      .then(getLastMessages.bind(this))
      .then(getNotificationChatAngel.bind(this))
      .then(getNotificationChatArchangel.bind(this))
      .then(getUserObs.bind(this))
      .then(resolvePromise.bind(this))

      // function verifyIfHaveConnect() {
      //   Network.onDisconnect().subscribe(() => {
      //     this.verifyNetwork = false;
      //     if(this.loading) {
      //       this.loading.dismiss;
      //     };
      //   });
      //   Network.onConnect().subscribe(() => {
      //     console.log(123);
      //     this.verifyNetwork = true;
      //   });
      // }

      function getTrinityService() {
        let trinity = {
          overcomer : "",
          angel: "BxQ8roWUO0aP15oAZKdPYQvsSIY2",
          archangel: "hLcd2QHiz0R3WsZsUnAF3NTwhUD2"
        };
        return trinity;
      }

      function findOvercomer(trinity) {
        return this.userStorageService.getUser().then((user) => {
          trinity.overcomer = user;
          return trinity;
        });
      }

      function findAngel(trinity) {
        return this.userStorageService.findUser(trinity.angel).then((user) => {
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

      function validateChatAngel(trinity) {

        return this.chatStorageService.getChat(trinity.overcomer.$key, trinity.angel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.angel.chat = this.chatStorageService.createChat(trinity.overcomer, trinity.angel).chatUid;
          } else {
            trinity.angel.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function validateChatArchangel(trinity) {
        return this.chatStorageService.getChat(trinity.overcomer.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.archangel.chat = this.chatStorageService.createChat(trinity.overcomer, trinity.archangel).chatUid;
          } else {
            trinity.archangel.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function getChatAngel(trinity) {
        return this.chatStorageService.getChatUsers(trinity.angel.chat).then((chat) => {
          trinity.angel.chat = chat;
          return trinity;
        })
      }

      function getChatArchangel(trinity) {
        return this.chatStorageService.getChatUsers(trinity.archangel.chat).then((chat) => {
          trinity.archangel.chat = chat;
          return trinity;
        })
      }

      function getLastMessages(trinity) {
        try {
          trinity.angel.lastMessages = this.chatStorageService.getLastMessage(trinity.angel.chat.chatUid, trinity.angel.$key);
          trinity.archangel.lastMessages = this.chatStorageService.getLastMessage(trinity.archangel.chat.chatUid, trinity.archangel.$key);
          return trinity;
        } catch(error) {
          trinity.archangel.lastMessages = undefined;
          return trinity;
        }
      }

      function getNotificationChatAngel(trinity) {
        for(let i = 0; i < trinity.angel.chat.users.length; i++) {
          if(trinity.angel.chat.users[i].uid == trinity.angel.$key) {
            trinity.angel.chat.view = this.chatStorageService.getChatDatasObs(trinity.angel.chat.$key, i);
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

      function getUserObs(trinity) {
        let wrapper : any = {};
        wrapper.user = this.userStorageService.getUserObs();
        wrapper.trinity = trinity;
        return wrapper;
      }

      function resolvePromise(trinity) {
        resolve(trinity);
      }

    });
  }
}
