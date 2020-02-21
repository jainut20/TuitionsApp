import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import {AngularFireDatabase} from '@angular/fire/database'
import {Observable} from 'rxjs'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register-as-student',
  templateUrl: './register-as-student.page.html',
  styleUrls: ['./register-as-student.page.scss'],
})
export class RegisterAsStudentPage implements OnInit {

  name:string=""
  password:string=""
  cpassword:string=""
  email:string
  type="S"
  std=new Array(5)
  class=""
  board=""
  teacher: Observable<any[]>;
  teachername=""
  code
  SelectedTeacher
  constructor(public afstore:AngularFirestore,public router:Router,private afAuth:AngularFireAuth,public alert:AlertController) { 
  
    this.teacher = afstore.collection('Teachers').valueChanges()
    
    for (let index = 0; index <5; index++) {
      this.std[index]=index+6;
    }

  }
  ngOnInit() {
  }
  async register(){
    
    if (this.name == "" ||  this.password == "" || this.cpassword == ""|| this.class == "" || this.board=="" || this.code=="") {
     this.showAlert("ERROR","Please fill in all the fields")
      } 
      else {
          try{
             this.teachername=this.SelectedTeacher.split('/')[1]
             let teachercode=this.SelectedTeacher.split('/')[0]
             const{name,email,password,cpassword,board,teachername,code}=this
              if(password!=cpassword){
                throw new Error("Passwords Dont match")
              }
              if(code!=teachercode){
              throw new Error("Teacher Code is wrong!");
                }
              else{
                  const res=await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
                  await this.afAuth.auth.currentUser.sendEmailVerification();
                  let id=res.user.uid
                  await this.showAlert("Verfication","Verification link has been sent to you,kindly check your email address");
                  await this.afstore.collection('Students').doc(res.user.uid).set({
                  Loggedin:false, 
                   id,
                    name,
                    email,
                    teachername,
                    board,
                    class:this.class,
                    Subjects:[]
                  })
                  this.afAuth.auth.signOut();
                    this.router.navigate(['/login'])
            }
          }
          catch(err){
            this.showAlert("Error",err.message)
          }
        }
  }


  async showAlert(header:string,message:string){
    const alert= await this.alert.create({
      header,
      message,
      buttons:["OK"]
    })
     await alert.present()
  }
 
} 
