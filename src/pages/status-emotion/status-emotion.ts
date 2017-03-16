import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-status-emotion',
  templateUrl: 'status-emotion.html'
})

export class StatusEmotionPage {

  emojis : any;

  constructor(private nav: NavController, private viewCtrl: ViewController) {
    this.emojis = [{ status: 'Abençoado', img: './assets/images/emoji-blessed.svg'},
                   { status: 'Apaixonado(a)', img: './assets/images/emoji-love.svg'},
                   { status: 'Cansado', img: './assets/images/emoji-sleep.svg'},
                   { status: 'Confiante', img: './assets/images/emoji-positive.svg'},
                   { status: 'Divertido', img: './assets/images/emoji-joker.svg'},
                   { status: 'Entediado', img: './assets/images/emoji-boring.svg'},
                   { status: 'Envergonhado', img: './assets/images/emoji-shame.svg'},
                   { status: 'Feliz', img: './assets/images/emoji-happy.svg'},
                   { status: 'Normal',  img: './assets/images/emoji-normal.svg'},
                   { status: 'Mal estar', img: './assets/images/emoji-sick.svg'},
                   { status: 'Muito feliz', img: './assets/images/emoji-very-happy.svg'},
                   { status: 'Muito triste', img: './assets/images/emoji-very-sad.svg'},
                   { status: 'Raiva', img: './assets/images/emoji-angry.svg'},
                   { status: 'Serio', img: './assets/images/emoji-serious.svg'},
                   { status: 'Surpreso', img: './assets/images/emoji-surprise.svg'},
                   { status: 'Tenso', img: './assets/images/emoji-nervous.svg'},
                   { status: 'Triste', img: './assets/images/emoji-sad.svg'},

                   ]
  }


  setEmotion(emotion) {
    emotion.is_active = 1;
    this.viewCtrl.dismiss(emotion);
  }

  closePage() {
    this.viewCtrl.dismiss();
  }



}
