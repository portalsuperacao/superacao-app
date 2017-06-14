import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { ChatStorageService} from '../../providers/database/chat-storage-service';
import { UserStorageService } from '../../providers/database/user-storage.service';
import { Utils } from '../../providers/util/utils';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  @ViewChild(Content) content: Content;

  message;
  listMessages;
  user1;
  user2;
  chat;
  status;
  countMessages = 30;


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
      return 'message message1'
    } else if (this.user2.$key == uidUser) {
      return 'message message2'
    }
  }

  sendMessage() {
    this._validateMessage().then((msg) => {
      this.message = "";
      this.content.scrollToBottom(0);
    })
  }

  doRefresh(refresh) {
    this.countMessages += this.countMessages
    this.chatStorageService.getMessages(this.chat.chatUid, this.countMessages).subscribe((messages) => {
      this.listMessages = messages
      refresh.complete()
    })
  }

 private _validateMessage() {
    return new Promise((resolve) => {
    let i = 0;
    Promise.resolve(i)
    .then(validateInput.bind(this))
    .then(msgWrapper.bind(this))
    .then(sendMessage.bind(this))
    .then(pushNotification.bind(this))
    .then(updateChatView.bind(this))
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

    function updateChatView(msg) {
      this._setChatView(this.user1.$key, 1)
      return msg;
    }

    function resolvePromise(msg) {
      resolve(msg);
    }
  });
}

private _getChat() {
  return new Promise((resolve) => {
    Promise.resolve()
    .then(getChatDatas.bind(this))
    .then(getMessages.bind(this))
    .then(updateChatView.bind(this))
    .then(resolvePromise.bind(this))

    function getChatDatas() {
      return this.chat;
    }

    function getMessages(msg) {
      msg.messages = this.chatStorageService.getMessages(this.chat.chatUid, this.countMessages);
      return msg;
    }

    function updateChatView(msg) {
      this._setChatView(this.user2.$key, 0)
      return msg;
    }

    function resolvePromise(msg) {
      resolve(msg)
    }
  });

}

private _setChatView(user, value) {
  for(let i = 0; i < this.chat.users.length; i++) {
    if(this.chat.users[i].uid == user) {
      this.chatStorageService.updateChatView(this.chat.$key, i, value)
    }
  }
}

private _hideTabs() {
  let elem = <HTMLElement>document.querySelector(".tabbar");
  if (elem != null) {
    elem.style.display = 'none';
  }
}

private _showTabs() {
  let elem = <HTMLElement>document.querySelector(".tabbar");
  if (elem != null) {
    elem.style.display = 'flex';
  }
}
}
