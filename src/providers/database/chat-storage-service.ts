import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    let subject = new BehaviorSubject(null);
     return new Promise((resolve) => {
       this.af.database.list('/chat')
         .subscribe((snapshots: any) => {
           snapshots.forEach((datas) => {
             if(datas.users.user1.uid == userUid1 && datas.users.user2.uid == userUid2) {
                 subject.next(datas);
             }
           });
       });

       if(!subject.getValue()) {
         let chat = false;
         this.af.database.list('/chat')
           .subscribe((snapshots: any) => {
             snapshots.forEach((datas) => {
               if(datas.users.user1.uid == userUid1 && datas.users.user2.uid == userUid2) {
                   chat = datas;
               }
             });
             resolve(chat);
         });
         return;
       }

       resolve(subject.getValue());
     });
   }

  createChat(user1, user2) {
    let datas = {
      chatUid : this._generateChatToken(),
      users: {
        user1: {
          uid: user1.$key,
          token_device: user1.token_device
        },
        user2: {
          uid: user2.$key,
          token_device: user2.token_device
        }
      }
    }

    this.db = this.af.database.list('/chat/');
    this.db.push(datas);

    return {chatUid: datas.chatUid};
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
      let database = firebase.database().ref('/messages/' + chatUid);

      database.orderByChild("uid_user").equalTo(userUid).limitToLast(1).on("child_added", (snapshot) => {
        subject.next(snapshot.val());
      })
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
          if(data === 'true') {
            resolve(true);
          } else {
            resolve(false);
          }
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
