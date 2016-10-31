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

  message: Object;
  listMessages = [];
  lengthMessages = 0;
  lengthCtrl = false;
  user1;
  user2;
  chatUid;
  ctrlFloat = true;
  status;


  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public chatStorageService: ChatStorageService,
    public userStorageService: UserStorageService,
    public loadingCtrl: LoadingController,
    public utils: Utils) {
      this.user1 = this.params.get('user1');
      this.user2 = this.params.get('user2');
      this.chatUid = this.params.get('chat');
      this.status = this.user2.emotion.is_active;
  }

  ionViewDidLoad() {
    this.utils.generatePush().then((datas) => {
      console.log("remover o push!");
    }).catch((error) => {

    });

    this._clearStatusEmotion();
    this._getMessages();
  }

  sendMessage() {
    if(!this.message) {
      return;
    }

    let msgWrapper : any = {
      uid_user : this.user1.$key,
      msg : this.message,
      created_at: new Date().getTime(),
    }

    this.chatStorageService.pushMessage(msgWrapper, this.chatUid);
    this.message = "";

    msgWrapper.token_device = this.user2.token_device;
    msgWrapper.name_user = this.user1.name;

    // === Push notification ===
    setTimeout(() => {
        this.chatStorageService.pushNotification(msgWrapper);
        this.content.scrollToBottom(0);
    }, 100);
  }

  openGallery() {
    let loading = this.loadingCtrl.create({
      content : "Aguarde..."
    });

    loading.present();

    this.utils.openGallery().then((image) => {
      loading.dismiss();
      this._sendImg(image);
    }).catch((error) => {
      loading.dismiss();
      console.log(error);
    });
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

  _sendImg(img) {
    let msgWrapper : any = {
      uid_user : this.user1.$key,
      "img" : img,
      created_at: new Date().getTime()
    }

    this.chatStorageService.pushMessage(msgWrapper, this.chatUid);

    msgWrapper.token_device = this.user2.token_device;
    msgWrapper.name_user = this.user1.name;
    msgWrapper.msg = "Uma imagem foi enviada!";

    // === Push notification ===
    setTimeout(() => {
        this.chatStorageService.pushNotification(msgWrapper);
        this.content.scrollToBottom(0);
    }, 100);
  }

  _clearStatusEmotion() {
    if(this.status) {
      let status = this.user2.emotion;
      status.is_active = 0;
      this.userStorageService.setEmotion(status, this.user2.$key);
    }
  }

  _getMessages() {
    this.chatStorageService.getLastMessageKey(this.chatUid).then((key) => {
      let length = 0;
      this.chatStorageService.getMessages(this.chatUid).subscribe((msgs : any) => {
        this.listMessages.push(msgs);
        length++;

        if(msgs.$key == key) {
           this.lengthMessages = length;
           this.lengthCtrl = true;

           if(this.status) {
             console.log(this.status);
             //this._generateMessageStaus(this.user2.name, this.user2.emotion.img, this.user2.emotion.status);
             setTimeout(() => {
               this.content.scrollToBottom(0);
             }, 500);
           } else {
             setTimeout(() => {
               this.content.scrollToBottom(0);
             }, 500);
           }
        }

        if(this.lengthCtrl === true && length > this.lengthMessages) {
          this.lengthMessages = length;

          setTimeout(() => {
            this.content.scrollToBottom(0);
          }, 500);
        }
      });
    });
  }

  _generateMessageStaus(name, image, status) {
    this.listMessages.push({
      msg: name + ' está se sentindo ' + status,
      is_status: 1,
      img: image
    });
  }

}
