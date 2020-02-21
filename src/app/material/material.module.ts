import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialPageRoutingModule } from './material-routing.module';

import { MaterialPage } from './material.page';
import { SharedModule } from '../share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialPageRoutingModule,
    SharedModule
  ],
  declarations: [MaterialPage]
})
export class MaterialPageModule {}
