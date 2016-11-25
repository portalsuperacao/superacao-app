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
  space = 'close';
  overcomerNotification = [];
  angelNotification = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public chatStorageService: ChatStorageService,
    public userStorageService: UserStorageService,
    public utils: Utils) {

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
        this.angelNotification[i] =  user.angel.chat.view;
      });

      loading.dismiss();
    });
  }

  openPublicEvents(user) {
    this.navCtrl.push(CalendarPublicEventPage, {'user' : user});
  }

  openChat(user1, user2, index, indexTypeUser) {
    this.navCtrl.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chat, 'status': 1});
  }

  toggleSpace() {
    if(this.space == 'open') {
      this.space = 'close';
    } else {
      this.space = 'open';
    }
  }

  updateDatas(userStorageService, chatStorageService, utils) {
    return new Promise((resolve) => {
      Promise.resolve()
      .then(getTrinityService)
      .then(loopThroughTrinitys)

      function getTrinityService() {
        let trinitys = [{
          overcomer : "OUT4lTNNalPrxA7MaTMW4jcW0Ff1",
          angel: "t3RiITF4w5aHPgHfAgnUZYI6zBs1",
          archangel: ""
        },
        {
          overcomer : "CPUqImztMgZ1ptdTGJnuk1sNV0m2",
          angel: "t3RiITF4w5aHPgHfAgnUZYI6zBs1",
          archangel: ""
        }];

        return trinitys;
      }

      function loopThroughTrinitys(trinitys) {
          for(let i = 0; i < trinitys.length; i++) {
            Promise.resolve(trinitys[i])
            .then(findOvercomer)
            .then(findAngel)
            .then(findArchangel)
            .then(validateChatOvercomer)
            .then(validateChatAngel)
            .then(getChatOvercomer)
            .then(getChatAngel)
            .then(getNotificationChatOvercomer)
            .then(getNotificationChatAngel)
            .then(getLastMessages)
            .then((trinity) => {
              if(i === (trinitys.length - 1)) {
                resolve(trinitys);
              }
            });
          }
      }


      function findOvercomer(trinity) {
        return userStorageService.findUser(trinity.overcomer).then((user) => {
          trinity.overcomer = user;
          return trinity;
        })
      }

      function findAngel(trinity) {
        return trinity.angel = userStorageService.findUser(trinity.angel).then((user) => {
          trinity.angel = user;
          return trinity;
        });
      }

      function findArchangel(trinity) {
        return userStorageService.getUser().then((user) => {
          trinity.archangel = user;
          return trinity;
        });
      }

      function validateChatOvercomer(trinity) {
        return chatStorageService.getChat(trinity.overcomer.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.overcomer.chat = chatStorageService.createChat(trinity.overcomer, trinity.archangel).chatUid;
          } else {
            trinity.overcomer.chat = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function validateChatAngel(trinity) {
        return chatStorageService.getChat(trinity.angel.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.angel.chat = chatStorageService.createChat(trinity.angel, trinity.archangel).chatUid;
          } else {
            trinity.angel.chat = chatDatas.chatUid;
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

      function getChatAngel(trinity) {
        return chatStorageService.getChatUsers(trinity.angel.chat).then((chat) => {
          trinity.angel.chat = chat;
          return trinity;
        })
      }

      function getNotificationChatOvercomer(trinity) {
        for(let i = 0; i < trinity.overcomer.chat.users.length; i++) {
          if(trinity.overcomer.chat.users[i].uid == trinity.archangel.$key) {
            trinity.overcomer.chat.view = chatStorageService.getChatDatasObs(trinity.overcomer.chat.chatKey, i);
          }
        }

        return trinity;
      }

      function getNotificationChatAngel(trinity) {
        for(let i = 0; i < trinity.angel.chat.users.length; i++) {
          if(trinity.angel.chat.users[i].uid == trinity.archangel.$key) {
            trinity.angel.chat.view = chatStorageService.getChatDatasObs(trinity.angel.chat.chatKey, i);
          }
        }

        return trinity;
      }

      function getLastMessages(trinity) {
        trinity.overcomer.lastMessages = chatStorageService.getLastMessage(trinity.overcomer.chat.chatUid, trinity.overcomer.$key);
        trinity.angel.lastMessages = chatStorageService.getLastMessage(trinity.angel.chat.chatUid, trinity.angel.$key);

        return trinity;
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
