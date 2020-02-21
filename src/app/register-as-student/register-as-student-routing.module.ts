import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAsStudentPage } from './register-as-student.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAsStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAsStudentPageRoutingModule {}
