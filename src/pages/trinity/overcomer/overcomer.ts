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
  overcomerObs;
  overcomer;
  angel;
  archangel;

  loading;

  constructor(
    public navCtrl: NavController,
    public userStorageService: UserStorageService,
    public chatStorageService: ChatStorageService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public utils: Utils) {

    }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loading.present();
    this.updateDatas(this.userStorageService, this.chatStorageService, this.utils).then((datas : any) => {
      this.overcomerObs = datas.user;
      this.overcomer = datas.trinity.overcomer;
      this.angel = datas.trinity.angel;
      this.archangel = datas.trinity.archangel;

      loading.dismiss();
    });

    //this._removePush();
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

  updateDatas(userStorageService, chatStorageService, utils) {
    return new Promise((resolve) => {
      Promise.resolve()
      .then(getTrinityService)
      .then(findOvercomer)
      .then(findAngel)
      .then(findArchangel)
      .then(validateChatAngel)
      .then(validateChatArchangel)
      .then(getChatAngel)
      .then(getChatArchangel)
      .then(getNotificationChatAngel)
      .then(getNotificationChatArchangel)
      .then(getLastMessages)
      .then(getUserObs)
      .then(resolvePromise)


      function getTrinityService() {
        let trinity = {
          overcomer : "",
          angel: "t3RiITF4w5aHPgHfAgnUZYI6zBs1",
          archangel: "RK2xk9yrgjSRgv5Tmm3ThRgdE102"
        };
        return trinity;
      }

      function findOvercomer(trinity) {
        return userStorageService.getUser().then((user) => {
          trinity.overcomer = user;
          return trinity;
        });
      }

      function findAngel(trinity) {
        return userStorageService.findUser(trinity.angel).then((user) => {
          trinity.angel = user;
          return trinity;
        });
      }

      function findArchangel(trinity) {
        return trinity.archangel = userStorageService.findUser(trinity.archangel).then((user) => {
          trinity.archangel = user;
          return trinity;
        });
      }

      function validateChatAngel(trinity) {
        return chatStorageService.getChat(trinity.overcomer.$key, trinity.angel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.angel.chat = chatStorageService.createChat(trinity.overcomer, trinity.angel);
          } else {
            trinity.angel.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function validateChatArchangel(trinity) {
        return chatStorageService.getChat(trinity.overcomer.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.archangel.chat = chatStorageService.createChat(trinity.overcomer, trinity.archangel);
          } else {
            trinity.archangel.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function getChatAngel(trinity) {
        return chatStorageService.getChatUsers(trinity.angel.chat).then((chat) => {
          trinity.angel.chat = chat;
          return trinity;
        })
      }

      function getChatArchangel(trinity) {
        return chatStorageService.getChatUsers(trinity.archangel.chat).then((chat) => {
          trinity.archangel.chat = chat;
          return trinity;
        })
      }

      function getLastMessages(trinity) {
        trinity.angel.lastMessages = chatStorageService.getLastMessage(trinity.angel.chat.chatUid, trinity.angel.$key);
        trinity.archangel.lastMessages = chatStorageService.getLastMessage(trinity.archangel.chat.chatUid, trinity.archangel.$key);

        return trinity;
      }

      function getNotificationChatAngel(trinity) {
        for(let i = 0; i < trinity.angel.chat.users.length; i++) {
          if(trinity.angel.chat.users[i].uid == trinity.angel.$key) {
            trinity.angel.chat.view = chatStorageService.getViewChat(trinity.angel.chat.chatKey, i);
          }
        }

        return trinity;
      }

      function getNotificationChatArchangel(trinity) {
        for(let i = 0; i < trinity.archangel.chat.users.length; i++) {
          if(trinity.archangel.chat.users[i].uid == trinity.archangel.$key) {
            trinity.archangel.chat.view = chatStorageService.getViewChat(trinity.archangel.chat.chatKey, i);
          }
        }

        return trinity;
      }

      function getUserObs(trinity) {
        let wrapper : any = {};
        wrapper.user = userStorageService.getUserObs();
        wrapper.trinity = trinity;
        return wrapper;
      }

      function resolvePromise(trinity) {
        console.log(trinity);
        resolve(trinity);
      }

    });
  }

  _removePush() {
    this.utils.generatePush().then((datas) => {
      console.log("remover o push!");
    }).catch((error) => {

    });
  }
}
