import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArchangelMissionsPage } from './missions/missions';
import { ArchangelChatPage } from './chat/chat';


@Component({
  selector: 'page-archangel',
  templateUrl: 'archangel.html'
})


export class ArchangelPage {

  missionsPage = ArchangelMissionsPage;
  chatPage = ArchangelChatPage;

  constructor(public navCtrl: NavController) {}

}
