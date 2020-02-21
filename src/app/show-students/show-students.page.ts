import { Component, OnInit } from '@angular/core';
import { userService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.page.html',
  styleUrls: ['./show-students.page.scss'],
})
export class ShowStudentsPage implements OnInit {
  main
  students
  constructor(public user:userService,public afstore:AngularFirestore,public router:Router) { }

  ngOnInit() {

    this.main =this.afstore.collection(`Students`, ref => ref.where('teachername', '==',this.user.getName()));

    this.main.valueChanges().subscribe(event => {
      this.students=event
  });
  }
  EditDetails(key){
    this.router.navigate(['tabs/studentdetails/'],{
    queryParams:key
    })
    
  }
}
