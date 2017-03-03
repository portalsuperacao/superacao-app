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
    this._getChat(this.chatStorageService, this.chat, this.user1, this.utils).then((chat : any) => {
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
    } else {
      return 'message-status';
    }
  }

  sendMessage() {
    this._validateMessage(this.message,this.user1, this.user2, this.chatStorageService, this.chat).then((msg) => {
      this.message = "";
      this.content.scrollToBottom(0);
    })
  }

 _validateMessage(message, user1, user2, chatStorageService, chat) {
    return new Promise((resolve) => {
    let i = 0;
    Promise.resolve(i)
    .then(validateInput)
    .then(msgWrapper)
    .then(sendMessage.bind(this))
    .then(pushNotification.bind(this))
    .then(resolvePromise)

    function validateInput() {
      if (message.trim() !== "") return;
    }

    function msgWrapper() {
      let msgWrapper : any = {
        uid_user : user1.$key,
        msg : message,
        created_at: new Date().getTime(),
      }
      return msgWrapper;
    }

    function sendMessage(msg) {
      this.chatStorageService.pushMessage(msg, chat.chatUid);
      return msg;
    }

    function pushNotification(msg) {
      msg.token_device = user2.other_datas.token_device;
      msg.name_user = user1.name;
      this.chatStorageService.pushNotification(msg)
      return msg;
    }

    function resolvePromise(msg) {
      resolve(msg);
    }
  });
}

_getChat(chatStorageService, chat, user1, utils) {
  return new Promise((resolve) => {
    Promise.resolve()
    .then(getChatDatas)
    .then(getMessages.bind(this))
    .then(removePushNotification)
    .then(resolvePromise)

    function getChatDatas() {
      return chat;
    }

    function getMessages(msg) {
      msg.messages = chatStorageService.getMessages(chat.chatUid, this.countMessages);
      return msg;
    }

    function removePushNotification(msg) {
      utils.generatePush().then((datas) => {
        console.log("remover o push!");
      }).catch((error) => {});
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
