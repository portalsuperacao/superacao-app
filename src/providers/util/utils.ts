import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions  } from '@ionic-native/camera'
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { firebaseConfig } from '../../app/app.module'
import { Observable } from 'rxjs/Observable';


@Injectable()

export class Utils {
  private optionsPush: PushOptions;
  constructor(
    public platform: Platform,
    public push: Push,
    public camera: Camera
  ) {
    this.optionsPush =
    {
      android: {
          senderID: "1018181753983"
      },
        ios: {
            alert: "true",
            badge: true,
            sound: 'true'
        },
        windows: {}
    };
  }

  generatePush() {
    return new Observable((subject) => {
      if(this.platform.is('cordova')) {
        let pushObject: PushObject = this.push.init(this.optionsPush);
        pushObject.on('notification').subscribe((push) => {
          subject.next(push);
        });
      } else {
        subject.next(null);
      }
    });
  }

  getPushDeviceToken() {
    return new Promise((resolve, reject) => {
      if(this.platform.is('cordova')) {
        let pushObject: PushObject = this.push.init(this.optionsPush)
        pushObject.on('registration').subscribe((device) => {
          resolve(device)
        })
      } else {
        reject(null);
      }
    })
  }

  openGallery() {
    return new Promise((resolve, reject) => {
      let options : CameraOptions = {
          quality: 100,
          sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
      };

      this.camera.getPicture(options).then((imagePath) => {
        this._toBase64(imagePath).then((imageData) => {
          resolve(imageData);
        })
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
