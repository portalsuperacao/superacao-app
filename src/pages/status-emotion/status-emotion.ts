import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-status-emotion',
  templateUrl: 'status-emotion.html'
})

export class StatusEmotionPage {

  emojis;

  constructor(private nav: NavController, private viewCtrl: ViewController) {
    this.emojis = [{ status: 'Feliz',  img: './assets/images/happy-1.svg'},
                   { status: 'Apaixonado(a)', img: './assets/images/in-love.svg'},
                   { status: 'Triste', img: './assets/images/sad.svg'},
                   { status: 'Raiva', img: './assets/images/angry.svg'},
                   { status: 'Infeliz', img: './assets/images/unhappy.svg'},
                   { status: 'Surpreso', img: './assets/images/surprised.svg'}]
  }


  setEmotion(emotion) {
    emotion.is_active = 1;
    this.viewCtrl.dismiss(emotion);
  }

  closePage() {
    this.viewCtrl.dismiss();
  }



}
