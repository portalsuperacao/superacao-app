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
  space = 'close';

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

    this.trinitys.then((datas) => {
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
    this.nav.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chatUid, 'status': 1});
  }

  toggleSpace() {
    this.space == 'open' ? this.space = 'close' : this.space = 'open';
  }


  updateDatas(userStorageService, chatStorageService, utils) {
    return new Promise((resolve) => {
      Promise.resolve()
      .then(getTrinityService)
      .then(loopThroughTrinitys)
      .then(resolvePromise)

      function getTrinityService() {
        let trinitys = [{
          overcomer : "OUT4lTNNalPrxA7MaTMW4jcW0Ff1",
          angel: "",
          archangel: "RK2xk9yrgjSRgv5Tmm3ThRgdE102"
        },
        {
          overcomer : "CPUqImztMgZ1ptdTGJnuk1sNV0m2",
          angel: "",
          archangel: "RK2xk9yrgjSRgv5Tmm3ThRgdE102"
        }];
        return trinitys;
      }

      function loopThroughTrinitys(trinitys) {
        for(let i = 0; i < trinitys.length; i++) {
          Promise.resolve(trinitys[i])
          .then(findOvercomer)
          .then(findAngel)
          .then(findArchangel)
          .then(getChatOvercomer)
          .then(getChatArchangel)
          .then(getLastMessages)
        };

        return trinitys;
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

      function getChatOvercomer(trinity) {
        return chatStorageService.getChat(trinity.overcomer.$key, trinity.angel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.overcomer.chatUid = chatStorageService.createChat(trinity.overcomer, trinity.angel);
          } else {
            trinity.overcomer.chatUid = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function getChatArchangel(trinity) {
        return chatStorageService.getChat(trinity.angel.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.archangel.chatUid = chatStorageService.createChat(trinity.angel, trinity.archangel);
          } else {
            trinity.archangel.chatUid = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function getLastMessages(trinity) {
        trinity.overcomer.lastMessages = chatStorageService.getLastMessage(trinity.overcomer.chatUid, trinity.overcomer.$key);
        trinity.archangel.lastMessages = chatStorageService.getLastMessage(trinity.archangel.chatUid, trinity.archangel.$key);

        return trinity;
      }

      function resolvePromise(trinitys) {
        resolve(trinitys);
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
