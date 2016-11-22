import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as localforage from "localforage";
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

  getChat(userUid1, userUid2) {
     let chatDatas = false;
     return new Promise((resolve) => {
       let database = firebase.database().ref('/chat/');
       database.once('value').then((snapshot) => {
         snapshot.forEach((snapshotChild) => {
            let data = snapshotChild.val();

            if(data.users.user1.uid == userUid1 && data.users.user2.uid == userUid2) {
              chatDatas = data;
            } else if (data.users.user2.uid == userUid1 && data.users.user1.uid == userUid2) {
              chatDatas = data;
            }

         });
         resolve(chatDatas);
       });
    });
  }

  createChat(user1, user2) {
    let datas = {
      chatUid : this._generateChatToken(),
      users: {
        user1: {
          uid: user1.$key,
          token_device: user1.other_datas.token_device,
          view: 0
        },
        user2: {
          uid: user2.$key,
          token_device: user2.other_datas.token_device,
          view: 0
        }
      }
    }

    this.db = this.af.database.list('/chat/');
    this.db.push(datas);

    return {chatUid: datas.chatUid};
  }

  setViewChat(chatUid, user, value) {
    let db = this.af.database.object('/messages/' + chatUid + '/' + user);
    db.update({view : value});
  }

  getMessages(chatUid) {
    return new Observable((subject) => {
      let database = firebase.database().ref('/messages/' + chatUid);
      database.on('child_added', (snapshot) => {
          let data = snapshot.val();
          data.$key = snapshot.key;
          subject.next(data);
      });
    })
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

  pushNotification(datas) {
    return new Promise(resolve => {
      this._getTokenJwt().then((token) => {
        let body = JSON.stringify({
          "token": token,
          "token_device" : datas.token_device,
          "message": datas.msg,
          "name_user": datas.name_user
        });

        this.http.post(this.url, body, this.options)
          .subscribe(data => {
            resolve();
          });
        });
      });

  }

  setLocalNotification(userUid, data) {
    localforage.setItem('notifications-' + userUid , data);
  }

  getLocalNotification(userUid) {
    return new Promise((resolve) => {
        localforage.getItem('notifications-' + userUid).then((data) => {
          resolve(data);
      });
    });
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

   _getTokenJwt() {
     return new Promise((resolve) => {
       firebase.auth().currentUser.getToken(true).then((token) => {
         resolve(token);
       }).catch((error) => {
         resolve(error);
       })
     });
   }


}
