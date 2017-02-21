import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, Push } from 'ionic-native';
import { firebaseConfig } from '../../app/app.module'


@Injectable()

export class Utils {
  constructor(public platform: Platform) {

  }

  generatePush() {
    let push = Push.init({
    android: {
        senderID: "1018181753983"
    },
      ios: {
          alert: "true",
          badge: true,
          sound: 'true'
      },
      windows: {}
    });

    return new Promise((resolve, reject) => {
      if(push.on) {
        push.on('notification', (data) => {
          resolve(data);
        });
      } else {
        reject(false);
      }
    });
  }

  getPushDeviceToken() {
    let push = Push.init({
      android: {
          senderID:  firebaseConfig.messagingSenderId
      },
        ios: {
            alert: "true",
            badge: true,
            sound: 'true'
        },
        windows: {}
    });

    return new Promise((resolve, reject) => {
      if(push.on) {
        push.on('registration', (deviceToken) => {
          resolve(deviceToken.registrationId);
        });
      } else {
        reject(false);
      }
    });
  }

  openGallery() {
    return new Promise((resolve, reject) => {
      let options = {
          allowEdit: true,
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          mediaType: Camera.MediaType.PICTURE,
          destinationType: Camera.DestinationType.FILE_URI
      };

      Camera.getPicture(options).then((imgPath) => {
        this._toBase64(imgPath).then((base64Img) => {
          resolve(base64Img);
        });
      }).catch((error) => {
        reject("Fail!! " + JSON.stringify(error));
      });
    });
  }

  _toBase64(url: string) {
    return new Promise<string>(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
        });
  }
}
