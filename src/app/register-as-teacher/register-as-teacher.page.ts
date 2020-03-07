import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-as-teacher',
  templateUrl: './register-as-teacher.page.html',
  styleUrls: ['./register-as-teacher.page.scss'],
})
export class RegisterAsTeacherPage implements OnInit {
  name: string
  password: string
  cpassword: string
  email: string
  type = "T"
  code: string
  constructor(public afAuth: AngularFireAuth, public afstore: AngularFirestore, public alert: AlertController, public router: Router) { }

  ngOnInit() {
  }
  async register() {
    const { name, password, cpassword, code } = this
    let email = this.email.trim();
    if (password != cpassword) {
      this.showAlert("Error!", "Passwords Dont match")
      return console.error("passwords dont match ")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      this.afAuth.auth.currentUser.sendEmailVerification();
      this.showAlert("Verfication", "Verification link has been sent to you,kindly check your email address");
      this.afstore.doc(`Teachers/${res.user.uid}`).set({
        name,
        email,
        code
      })
      // this.showAlert("Success","Succefully Registered")
      this.router.navigate(['/login'])
    }
    catch (err) {
      console.dir(err)
      this.showAlert("error", err.message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }


}

