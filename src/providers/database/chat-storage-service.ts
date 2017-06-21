import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class ChatStorageService {

  constructor(private db: AngularFireDatabase) {

  }

  createChat(user1, user2) {
    let datas = {
      chatUid : this._generateChatToken(),
      users: []
    }

    for(let i = 0; i < arguments.length; i++) {
      datas.users.push({
        uid: arguments[i].$key,
        token_device: arguments[i].other_datas.token_device,
        view: 0
      });
    }

    let database = this.db.list('/chat/');
    database.push(datas);

    return {chatUid: datas.chatUid};
  }

  getChat(userUid1, userUid2) {
     let chatDatas = false;
     return new Promise((resolve) => {
       this.db.list('/chat').subscribe((snapshots) => {
         snapshots.forEach((snapshot) => {
            if(snapshot.users[0].uid == userUid1 && snapshot.users[1].uid == userUid2) {
              chatDatas = snapshot;
            } else if (snapshot.users[1].uid == userUid1 && snapshot.users[0].uid == userUid2) {
              chatDatas = snapshot;
            }
         });
         resolve(chatDatas);
       });
    });
  }

  getChatUsers(chatUid) {
    return new Promise((resolve) => {
      this.db.list('/chat').subscribe((snapshots) => {
        snapshots.forEach((snapshot) => {
          if(snapshot.chatUid === chatUid) {
            resolve(snapshot);
          }
        });
      });
    });
  }

  updateChatView(chatKey, user, value) {
    let database = this.db.object(`/chat/${chatKey}/users/${user}`);
    database.update({view : value});
  }

  getChatDatasObs(chatKey, user) : any {
    return this.db.object(`/chat/${chatKey}/users/${user}`);
  }

  getMessages(chatUid, amount) {
    return this.db.list(`/messages/${chatUid}`, {
      query: {
        orderByChild: 'created_at',
        startAt: Date.now() / 1000,
        limitToLast: amount
      }
    });
  }

  getLastMessage(chatUid, userUid) {
    return new Observable((observer) => {
      this.db.list(`/messages/${chatUid}`, {
        query: {
          orderByChild: 'uid_user',
          equalTo: userUid,
          limitToLast: 1
        }
      }).subscribe((snapshot) => {
        observer.next(snapshot[0])
      });
    });
  }

  pushMessage(datas, chatUid) {
      let database = this.db.list(`/messages/${chatUid}`);
      database.push(datas);
  }

  pushNotification(data) {
    let notification = {
      "collapse_key": 'demo',
      "priority": 'normal',
      "to": data.token_device,
      "notification": {
        "body": data.msg,
        "title": data.name_user + ' enviou uma mensagem!',
        "icon": 'icon',
        "sound": 'default'
      },
      "data": {},
      "icon": 'icon'
    }

    let database = this.db.list('/notifications/');
    database.push(notification);
  }

  private _generateChatToken() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
   }


}
