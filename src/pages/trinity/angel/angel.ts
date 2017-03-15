import { Network } from 'ionic-native';
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

  trinitys;
  space: any = 'close';
  overcomerNotification: any = [];
  archangelNotification: any = [];
  verifyNetwork: boolean = true;

  constructor(
    public nav: NavController,
    public userStorageService: UserStorageService,
    public chatStorageService: ChatStorageService,
    public utils: Utils,
    public loadingCtrl: LoadingController) {

    }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loading.present();

    this.trinitys = this.updateDatas(this.userStorageService, this.chatStorageService, this.utils);

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


  updateDatas(userStorageService, chatStorageService, utils) {
    return new Promise((resolve) => {
      Promise.resolve()
      .then(getTrinityService)
      .then(loopThroughTrinitys.bind(this))

      function getTrinityService() {
        let trinitys = [{
          overcomer : "<UID DO SUPERADOR DO FIREBASE>",
          angel: "",
          archangel: "<UID DO ARCANJO DO FIREBASE>"
        },
        {
          overcomer : "<UID DO ARCANJO DO SUPERADOR>",
          angel: "",
          archangel: "<UID DO SUPERADOR DO FIREBASE>"
        }];

        return trinitys;
      }

      function loopThroughTrinitys(trinitys) {
          for(let i = 0; i < trinitys.length; i++) {
            Promise.resolve(trinitys[i])
            .then(verifyIfHaveConnect.bind(this))
            .then(findOvercomer)
            .then(findAngel)
            .then(findArchangel)
            .then(validateChatOvercomer)
            .then(validateChatArchangel)
            .then(getChatOvercomer)
            .then(getChatArchangel)
            .then(getNotificationChatOvercomer)
            .then(getNotificationChatArchangel)
            .then(getLastMessages)
            .then((trinity) => {
              if(i === (trinitys.length - 1)) {
                resolve(trinitys);
              }
            });
          }
      }

      function verifyIfHaveConnect(trinity) {
        Network.onDisconnect().subscribe(() => {
          this.verifyNetwork = false
        });

        return trinity;
      }

      function findOvercomer(trinity) {
        return userStorageService.findUser(trinity.overcomer).then((user) => {
          trinity.overcomer = user;
          return trinity;
        })
      }

      function findAngel(trinity) {
        return userStorageService.getUser().then((user) => {
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

      function validateChatOvercomer(trinity) {
        return chatStorageService.getChat(trinity.overcomer.$key, trinity.angel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.overcomer.chat = chatStorageService.createChat(trinity.overcomer, trinity.angel).chatUid;
          } else {
            trinity.overcomer.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function validateChatArchangel(trinity) {
        return chatStorageService.getChat(trinity.angel.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.archangel.chat = chatStorageService.createChat(trinity.angel, trinity.archangel).chatUid;
          } else {
            trinity.archangel.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function getChatOvercomer(trinity) {
        return chatStorageService.getChatUsers(trinity.overcomer.chat).then((chat) => {
          trinity.overcomer.chat = chat;
          return trinity;
        })
      }

      function getChatArchangel(trinity) {
        return chatStorageService.getChatUsers(trinity.archangel.chat).then((chat) => {
          trinity.archangel.chat = chat;
          return trinity;
        })
      }

      function getNotificationChatOvercomer(trinity) {
        for(let i = 0; i < trinity.overcomer.chat.users.length; i++) {
          if(trinity.overcomer.chat.users[i].uid == trinity.angel.$key) {
            trinity.overcomer.chat.view = chatStorageService.getChatDatasObs(trinity.overcomer.chat.chatKey, i);
          }
        }

        return trinity;
      }

      function getNotificationChatArchangel(trinity) {
        for(let i = 0; i < trinity.archangel.chat.users.length; i++) {
          if(trinity.archangel.chat.users[i].uid == trinity.angel.$key) {
            trinity.archangel.chat.view = chatStorageService.getChatDatasObs(trinity.archangel.chat.chatKey, i);
          }
        }

        return trinity;
      }

      function getLastMessages(trinity) {
        trinity.overcomer.lastMessages = chatStorageService.getLastMessage(trinity.overcomer.chat.chatUid, trinity.overcomer.$key);
        trinity.archangel.lastMessages = chatStorageService.getLastMessage(trinity.archangel.chat.chatUid, trinity.archangel.$key);

        return trinity;
      }
    });
  }




}
