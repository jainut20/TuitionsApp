import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { userService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router:Router,public afAuth:AngularFireAuth,public alert:AlertController,public afstore:AngularFirestore,public user:userService) { }
  email:string=""
  password:string=""
  type:string
  main
  sub
  busy:boolean=false
  ngOnInit() {
  }
  async login(){
    const {email,password}=this
   
    try{
      //  debugger

                const res=await this.afAuth.auth.signInWithEmailAndPassword(email,password)
                const verified=this.afAuth.auth.currentUser.emailVerified;
                this.busy=true;
                //console.log(this.type)
                  // this.afstore.doc(`users/${res.user.uid}`)
                  if(res.user){
                    if(verified){
                      if(this.type=='S'){
                        await this.afstore.collection('Students').doc(res.user.uid).ref.get().then(async doc=> {
                          if (doc.exists) {
                            if(!doc.data().Loggedin){
                            let name= doc.data().name
                            let email= doc.data().email
                            let  board=doc.data().board;
                            let classs=doc.data().class;
                            let teacher=doc.data().teachername;
                            let subjects=[]
                            subjects=doc.data().Subjects;
                          await this.Setting_user(name,email,res.user.uid,"S",board,classs,teacher,subjects)
                           
                            this.router.navigate(['/tabs'])
                            await this.afstore.doc(`Students/${res.user.uid}`).update({
                              Loggedin:true
                            });
                            this.busy=false;
                           }
                           else{
                             this.afAuth.auth.signOut();
                             this.showAlert("Error","You are logged in another device")
                           }
                          } 
                          else {
                          throw Error("Check details again,No user found");
                          }
                        })
                      }
                      else{
                      await this.afstore.collection('Teachers').doc(res.user.uid).ref.get().then( async doc=> {
                        if (doc.exists) {
                          if(!doc.data().Loggedin){
                          let name= doc.data().name;
                          let email= doc.data().email
                          this.Setting_user(name,email,res.user.uid,"T","","","","")
                          this.router.navigate(['/tabs'])
                          await this.afstore.doc(`Teachers/${res.user.uid}`).update({
                            Loggedin:true
                          });
                          this.busy=false;
                         }
                         else{
                           this.afAuth.auth.signOut();
                          this.showAlert("Error","You are logged in another device")
                         }
                        } 
                        else {
                         
                          throw Error("Check details again,No user found")
                        }
                      })
                  //  console.log(this.user.getName())
                    }
                  }
                  else{
                    this.showAlert("OOPS","This email is not verified");
                      }       
          
                    }
    
        }
      
       catch(err){
        this.showAlert("Message",err.message)
      }
     
  }
  Setting_user(name,email,uid,type,board,classs,teacher,subjects){
    this.user.setUser({
      name,
      email,
      uid,
      type,
      board,
      classs,
      teacher,
      subjects
    })
  }

  RegisterAsTeacher(){
      this.router.navigate(['/register-as-teacher'])
  }
  RegisterAsStudent(){
    this.router.navigate(['/register-as-student'])
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
