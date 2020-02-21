import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAsTeacherPageRoutingModule } from './register-as-teacher-routing.module';

import { RegisterAsTeacherPage } from './register-as-teacher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterAsTeacherPageRoutingModule
  ],
  declarations: [RegisterAsTeacherPage]
})
export class RegisterAsTeacherPageModule {}
