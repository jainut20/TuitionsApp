import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { userService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements AfterViewChecked, OnInit {

  constructor(public user:userService,public afAuth:AngularFireAuth,public router:Router,public platform:Platform,public afstore:AngularFirestore) { }
  userName
  Email
  type
  teacher
  board
  classs
  subjects
  ngOnInit() {
    this.userName=this.user.getName();
    this.Email=this.user.getEmail();
    this.type=this.user.gettype();
    if(this.type=="S"){
      this.type="Student"
      this.teacher=this.user.getTeacher()
      this.board=this.user.getboard();
      this.classs=this.user.getclass();
      this.subjects=this.user.getsubjects();
    }
    else{
      this.type="Teacher"
    }
  }
  ngAfterViewChecked(){
    
    this.userName=this.user.getName();
    this.Email=this.user.getEmail();
    this.type=this.user.gettype();
    if(this.type=="S"){
      this.type="Student"
      this.teacher=this.user.getTeacher()
      this.board=this.user.getboard();
      this.classs=this.user.getclass();
      this.subjects=this.user.getsubjects();
    }
    else{
      this.type="Teacher"
    }
  }
  async SignOut() {
    if(this.type=="Student"){
      await this.afstore.doc(`Students/${this.user.getUID()}`).update({
        Loggedin:false
      });
    }
    if(this.type=="Teacher"){
      await this.afstore.doc(`Teachers/${this.user.getUID()}`).update({
        Loggedin:false
      });
    }
    this.user.setUser({
      name:" ",
      email:" ",
      uid:" ",
      type:" ",
      classs:" ",
      board:" ",
      teacher:"",
      subjects:[]
    });
    
   this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
      console.log(this.user.getName());
    })
  //   this.platform.exitApp()
  
  navigator['app'].exitApp();
}
  showStudents(){
    this.router.navigate(['tabs/show-students'])
  }
}
