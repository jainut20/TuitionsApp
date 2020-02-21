import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentdetailsPage } from './studentdetails.page';

const routes: Routes = [
  {
    path: '',
    component: StudentdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentdetailsPageRoutingModule {}
