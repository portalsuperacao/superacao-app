import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/Observable';



@Injectable()

export class ChatStorageService {
  private db : FirebaseListObservable<any>;
  private headers : Headers;
  private options : RequestOptions;
  private url = "http://172.17.62.169:3000/notification";

  constructor(private af: AngularFire, private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({headers: this.headers});


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
        view: 1
      });
    }

    this.db = this.af.database.list('/chat/');
    this.db.push(datas);

    return {chatUid: datas.chatUid};
  }

  getChat(userUid1, userUid2) {
     let chatDatas = false;
     return new Promise((resolve) => {
       let database = firebase.database().ref('/chat/');
       database.once('value').then((snapshots) => {
         snapshots.forEach((snapshot) => {
            let data = snapshot.val();
            if(data.users[0].uid == userUid1 && data.users[1].uid == userUid2) {
              chatDatas = data;
            } else if (data.users[1].uid == userUid1 && data.users[0].uid == userUid2) {
              chatDatas = data;
            }

         });
         resolve(chatDatas);
       });
    });
  }

  getChatUsers(chatUid) {
    return new Promise((resolve) => {
      let database = firebase.database().ref('/chat/');
      database.once('value').then((snapshots) => {
        snapshots.forEach((snapshot) => {
          let data = snapshot.val();

          if(data.chatUid === chatUid) {
            data.chatKey = snapshot.key;
            resolve(data)
          }
        });
      });
    });
  }

  setViewChat(chatKey, user, value) {
    let db = this.af.database.object('/chat/' + chatKey + '/users/' + user);
    db.update({view : value});
  }

  getChatDatasObs(chatKey, user) : any {
    return this.af.database.object('/chat/' + chatKey + '/users/' + user)
  }

  getMessages(chatUid, amount) {
    return this.af.database.list('/messages/' + chatUid, {
      query: {
        orderByChild: 'created_at',
        startAt: Date.now() / 1000,
        limitToLast: amount
      }
    });
  }

  getLastMessage(chatUid, userUid) {
    return new Observable((subject) => {
      try {
        let database = firebase.database().ref('/messages/' + chatUid);

        database.orderByChild("uid_user").equalTo(userUid).limitToLast(1).on("child_added", (snapshot) => {
          let data;
          data = snapshot.val();
          data.$key = snapshot.key;

          subject.next(data);
        })
      } catch(err) {
         subject.next(null);
      }
    });
  }

  getLastMessageKey(chatUid) {
    return new Promise((resolve) => {
      let database = firebase.database().ref('/messages/' + chatUid);

      database.orderByChild("uid_user").limitToLast(1).once("child_added", (snapshot) => {
        resolve(snapshot.key);
      })
    });
  }


  pushMessage(datas, chatUid) {
      this.db = this.af.database.list('/messages/' + chatUid);
      this.db.push(datas);
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

    this.db = this.af.database.list('/notifications/')
    this.db.push(notification)
  }


  _generateChatToken() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
   }
}
