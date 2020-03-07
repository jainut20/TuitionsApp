import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { userService } from '../user.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  
  mainuser:AngularFirestoreDocument
  sub
  name:string
  email
  busy:boolean=false;
  password :string
  newpassword: string
  type
  std=new Array(10)
  board
  classs
  constructor(private afs:AngularFirestore,public user:userService,public alertController:AlertController,public router:Router, public afAuth:AngularFireAuth,private navctrl:NavController) { 

    for (let index = 0; index <10; index++) {
      this.std[index]=index+1;
    }
    this.type=this.user.gettype();
    let type=this.type
    if(type=='S'){
      this.mainuser=afs.doc(`Students/${this.user.getUID()}`)
      this.sub=this.mainuser.valueChanges().subscribe(event=>{
        this.name=event.name
        this.email=event.email
        this.board=event.board
        this.classs=event.class
      })
    }
    else{
      this.mainuser=afs.doc(`Teachers/${this.user.getUID()}`)
      this.sub=this.mainuser.valueChanges().subscribe(event=>{
        this.name=event.name
        this.email=event.email
      })
    }
   
  }
  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  async updateDetails(){
    this.busy=true;
    if(!this.password) {
      this.busy = false
      return this.presentAlert('Error!', 'You have to enter a password')
    }
    try {
      await this.user.reAuth(this.user.getEmail(), this.password)
   
    } catch(error) {
      this.busy = false
      return this.presentAlert('Error!', 'Wrong password!')
    }


    if(this.newpassword) {
      await this.user.updatePassword(this.newpassword)
    }
    if(this.email !== this.user.getEmail()) {
      await this.user.updateEmail(this.email)
      this.afAuth.auth.currentUser.sendEmailVerification();
      await this.presentAlert("Attention","You will be logged out,Verify your new email and login")
    }
     if(this.type=='T'){
        this.mainuser.update({
          name:this.name,
          email:this.email
        })
    }
      if(this.type=='S'){
        this.mainuser.update({
          name:this.name,
          email:this.email,
          board:this.board,
          class:this.classs

        })
      }
    

    this.password = ""
    this.newpassword = ""
    this.busy = false
    await this.presentAlert('Done!', 'Your profile was updated!')
    if(this.type=="S"){
      await this.afs.doc(`Students/${this.user.getUID()}`).update({
        Loggedin:false
      });
    }
    if(this.type=="T"){
      await this.afs.doc(`Teachers/${this.user.getUID()}`).update({
        Loggedin:false
      });
    }
    this.afAuth.auth.signOut().then(()=>{
      this.navctrl.navigateRoot('/login');
 })
}
}
