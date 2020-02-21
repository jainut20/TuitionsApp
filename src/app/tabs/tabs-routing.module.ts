import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    component:TabsPage,
   children:[
     {
       path: 'profile',
       loadChildren:()=>import('../profile/profile.module').then(m=>m.ProfilePageModule)
     },
     {
      path: 'uploader',
      loadChildren: () => import('../uploader/uploader.module').then( m => m.UploaderPageModule)
    },
    {
      path: 'material',
      loadChildren: () => import('../material/material.module').then( m => m.MaterialPageModule)
    },
    {
      path: 'show-students',
      loadChildren: () => import('../show-students/show-students.module').then( m => m.ShowStudentsPageModule)
    },
    {
      path: 'edit-profile',
      loadChildren: () => import('../edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
    },
    {
      path: 'studentdetails',
      loadChildren: () => import('../studentdetails/studentdetails.module').then( m => m.StudentdetailsPageModule)
    },
   
   ]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
