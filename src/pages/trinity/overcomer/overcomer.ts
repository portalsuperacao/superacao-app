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
      this.utils.generatePush().then((datas) => {
        console.log("remover o push!");
      }).catch((error) => {

      });
    }

  ionViewDidLoad() {
    this.updateDatas(this.userStorageService, this.chatStorageService).then((datas : any) => {
      console.log(datas);
      this.overcomer = datas.user;
      this.angel = datas.trinity.angel;
      this.archangel = datas.trinity.archangel;
    });
  }

  ionViewWillEnter() {
    //this._updateDatas();
  }

  openStatusEmotion() {
    let modal = this.modalCtrl.create(StatusEmotionPage);
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) return;

      this.updateDatas(this.userStorageService, this.chatStorageService).then((datas : any) => {
        this.userStorageService.setEmotion(data, datas.trinity.overcomer.$key);
      });
    });
  }

  openHelpSystem() {
    //this.nav.push(OvercomerHelpSystemPage);
  }

  openChat(user1, user2) {
    this.navCtrl.push(ChatPage, {'user1' : user1, 'user2': user2, 'chat' : user2.chatUid});
  }

  openPublicEvents(user) {
    this.navCtrl.push(CalendarPublicEventPage, {'user' : user});
  }

  // Update datas
  updateDatas(userStorageService, chatStorageService) {
    return new Promise((resolve) => {
      Promise.resolve()
      .then(getTrinityService)
      .then(findOvercomer)
      .then(findAngel)
      .then(findArchangel)
      .then(getChatAngel)
      .then(getChatArchangel)
      .then(getLastMessages)
      .then(getUserObs)
      .then(resolvePromise)


      function getTrinityService() {
        let trinity = {
          overcomer : "",
          angel: "c9Em4kqXqQY6Rx0OHgnTsRpvrQi1",
          archangel: "NePUY0RoAfPSgAnCTn42IOHSBE72"
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
        return userStorageService.findUser(trinity.archangel).then((user) => {
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

      function getChatAngel(trinity) {
        return chatStorageService.getChat(trinity.overcomer.$key, trinity.angel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.angel.chatUid = chatStorageService.createChat(trinity.overcomer, this.angel);
          } else {
            trinity.angel.chatUid = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function getChatArchangel(trinity) {
        return chatStorageService.getChat(trinity.overcomer.$key, trinity.archangel.$key).then((chatDatas : any) => {
          if(!chatDatas) {
            trinity.archangel.chatUid = chatStorageService.createChat(trinity.overcomer, this.angel);
          } else {
            trinity.archangel.chatUid = chatDatas.chatUid;
          }

          return trinity;
        });
      }

      function generateNotificationAngel(trinity) {

      }

      function generateNotificationArchangel() {

      }

      function getLastMessages(trinity) {
        trinity.angel.lastMessages = chatStorageService.getLastMessage(trinity.angel.chatUid, trinity.angel.$key);
        trinity.archangel.lastMessages = chatStorageService.getLastMessage(trinity.archangel.chatUid, trinity.archangel.$key);

        return trinity;
      }

      function getUserObs(trinity) {
        let wrapper : any = {};
        wrapper.user = userStorageService.getUserObs();
        wrapper.trinity = trinity;
        return wrapper;
      }

      function resolvePromise(trinity) {
        resolve(trinity);
      }

    });
  }
}
