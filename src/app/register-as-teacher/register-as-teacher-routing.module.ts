import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAsTeacherPage } from './register-as-teacher.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAsTeacherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAsTeacherPageRoutingModule {}
