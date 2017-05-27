import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoStepPage } from './video-step';

@NgModule({
  declarations: [
    VideoStepPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoStepPage),
  ],
  exports: [
    VideoStepPage
  ]
})
export class VideoStepPageModule {}
