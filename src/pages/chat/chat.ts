import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { ChatStorageService} from '../../providers/database/chat-storage-service';
import { UserStorageService } from '../../providers/database/user-storage-service';
import { Utils } from '../../providers/util/utils';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  @ViewChild(Content) content: Content;

  message : any;
  listMessages : any;
  user1 : any;
  user2 : any;
  chat : any;
  ctrlFloat : boolean = true;
  status : any;
  countMessages : number = 30;


  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public chatStorageService: ChatStorageService,
    public userStorageService: UserStorageService,
    public loadingCtrl: LoadingController,
    public utils: Utils) {
      this.user1 = this.params.get('user1');
      this.user2 = this.params.get('user2');
      this.chat = this.params.get('chat');
      this.status = this.user2.emotion.is_active;
  }

  ionViewDidLoad() {
    this._getChat().then((chat : any) => {
      this.chat = chat;
    }).then(() => {
      this.chat.messages.subscribe((messages) => {
        this.listMessages = messages
      })
    })
  }

  ionViewWillEnter() {
    this.content.scrollToBottom(0);
    this._hideTabs();
  }

  ionViewDidLeave() {
    this._showTabs();
  }

  getClassMsg(uidUser) {
    if(this.user1.$key == uidUser) {
      return 'message1'
    } else if (this.user2.$key == uidUser) {
      return 'message2'
    }
  }

  sendMessage() {
    this._validateMessage().then((msg) => {
      this.message = "";
      this.content.scrollToBottom(0);
    })
  }

 _validateMessage() {
    return new Promise((resolve) => {
    let i = 0;
    Promise.resolve(i)
    .then(validateInput.bind(this))
    .then(msgWrapper.bind(this))
    .then(sendMessage.bind(this))
    .then(pushNotification.bind(this))
    .then(resolvePromise.bind(this))

    function validateInput() {
      if (this.message.trim() !== "") return;
    }

    function msgWrapper() {
      let msgWrapper : any = {
        uid_user : this.user1.$key,
        msg : this.message,
        created_at: new Date().getTime(),
      }
      return msgWrapper;
    }

    function sendMessage(msg) {
      this.chatStorageService.pushMessage(msg, this.chat.chatUid);
      return msg;
    }

    function pushNotification(msg) {
      msg.token_device = this.user2.other_datas.token_device;
      msg.name_user = this.user1.name;
      this.chatStorageService.pushNotification(msg)
      return msg;
    }

    function resolvePromise(msg) {
      resolve(msg);
    }
  });
}

_getChat() {
  return new Promise((resolve) => {
    Promise.resolve()
    .then(getChatDatas.bind(this))
    .then(getMessages.bind(this))
    .then(removePushNotification.bind(this))
    .then(resolvePromise.bind(this))

    function getChatDatas() {
      return this.chat;
    }

    function getMessages(msg) {
      msg.messages = this.chatStorageService.getMessages(this.chat.chatUid, this.countMessages);
      return msg;
    }

    function removePushNotification(msg) {
      this.utils.generatePush().subscribe((datas) => {
        console.log("remover o push!");
      });
      return msg;
    }

    function resolvePromise(msg) {
      resolve(msg)
    }
  });

}


 doRefresh(refresh) {
   this.countMessages += this.countMessages
   this.chatStorageService.getMessages(this.chat.chatUid, this.countMessages).subscribe((messages) => {
     this.listMessages = messages
     refresh.complete()
   })
 }

  _hideTabs() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'none';
    }
  }

  _showTabs() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'flex';
    }
  }

  // _clearStatusEmotion() {
  //   if(this.status) {
  //     let status = this.user2.emotion;
  //     status.is_active = 0;
  //     this.userStorageService.setEmotion(status, this.user2.$key);
  //   }
  // }
  //
  // _setViewMessage(user, valueView) {
  //   this.chat.users.forEach((datas, index) => {
  //     if(user.$key == datas.uid) {
  //       this.chatStorageService.setViewChat(this.chat.chatKey, index, valueView);
  //     }
  //   });
  // }
  //
  // _generateMessageStaus(name, image, status) {
  //   this.listMessages.push({
  //     msg: name + ' está se sentindo ' + status,
  //     is_status: 1,
  //     img: image
  //   });
  // }

}
