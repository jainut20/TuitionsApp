import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { userService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public afAuth:AngularFireAuth,public router:Router,public user:userService,public afstore:AngularFirestore) { }
  subjects:[]
  async ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) =>{
      if (user) {
        const uid=user.uid
        await this.afstore.collection('Students').doc(uid).ref.get().then(doc=> {
          if (doc.exists) {
            let name= doc.data().name
            let email= doc.data().email
            let  board=doc.data().board;
            let classs=doc.data().class;
            let type='S'
            let teacher=doc.data().teachername;
            let subjects=doc.data().Subjects;
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
            this.router.navigate(['/tabs'])
            return
           }
          }); 
            await this.afstore.collection('Teachers').doc(uid).ref.get().then(doc=> {
              if (doc.exists) {
                let name= doc.data().name;
                let email= doc.data().email;
                let type='T'
                let  board=""
                let classs=""
                let teacher=""
                let subjects=this.subjects
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
               this.router.navigate(['/tabs'])
              }
            })
          }
      else {
       this.router.navigate(['/login'])
      }
    });
  }  

}
