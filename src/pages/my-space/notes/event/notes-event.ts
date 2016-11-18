import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-my-space-notes-event',
  templateUrl: 'notes-event.html'
})
export class MySpaceNotesEventPage {
  noteOptions;
  title;
  text;
  list = [];
  params;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
      this.params = this.navParams.get('note');

      if(this.params) {
        this.title = this.params.title;

        if(this.params.text) {
          this.list.push({value: ''});
          this.text = this.params.text;
          this.noteOptions = 'text';

        } else {
          this.list = this.params.list;
          this.noteOptions = 'list';
        }
      } else {
        this.list.push({value: ''});
        this.noteOptions = 'list';
      }

  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  addItem() {
    this.list.push({value: ''});
  }

  removeItem(index) {
    if(this.list.length <= 1) {
      return;
    }

    this.list.splice(index, 1);
  }

  insertNote(type) {
    var wrapper : any;
    if (type === 'list') {
      wrapper = {
        title : this.title,
        list: this.list
      }
    } else {
      wrapper = {
        title: this.title,
        text: this.text
      }
    }

    if(this.params) {
      wrapper.$key = this.params.$key;
    }

    this.viewCtrl.dismiss(wrapper);
  }

  validateForm(type) {
    if(type === 'list') {
      for(let i = 0; i < this.list.length; i++) {
        if(!this.list[i].value) return false;
      }
    } else {
      if(!this.text) return false;
    }

    if(!this.title) return false;

    return true;
  }

}
