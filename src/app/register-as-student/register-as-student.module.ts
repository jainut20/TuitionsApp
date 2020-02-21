import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAsStudentPageRoutingModule } from './register-as-student-routing.module';

import { RegisterAsStudentPage } from './register-as-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterAsStudentPageRoutingModule
  ],
  declarations: [RegisterAsStudentPage]
})
export class RegisterAsStudentPageModule {}
