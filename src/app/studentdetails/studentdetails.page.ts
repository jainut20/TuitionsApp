import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.page.html',
  styleUrls: ['./studentdetails.page.scss'],
})
export class StudentdetailsPage implements OnInit {
  isIndeterminate:boolean;
  masterCheck:boolean;
  key
  name
  email
  subjects = [
    { val: 'Physics', isChecked: false },
    { val: 'Chemistry', isChecked: false },
    { val: 'Biology', isChecked: false },
    { val: 'Maths', isChecked: false },
    { val: 'Hindi', isChecked: false },
    { val: 'English', isChecked: false },
    { val: 'History', isChecked: false },
    { val: 'Geography', isChecked: false }    
  ];
  SelectedSubjects
  constructor(public route:ActivatedRoute,public afstore:AngularFirestore) { }

  async ngOnInit() {
   await this.route.queryParams.subscribe((res)=>{
      this.key=res;
  });

    this.name=this.key.name;
    this.email=this.key.email;
    this.SelectedSubjects=this.key.Subjects;
    this.subjects.forEach(element => {
    let index=this.SelectedSubjects.indexOf(element.val)
      if(index!=-1){
      element.isChecked=true;
      }
     });
     let checked=0;
     this.subjects.map(obj => {
      if (obj.isChecked) checked++;
    });
    if(checked==8){
      this.masterCheck=true;
    }
    } 
    checkMaster(abc) {
      setTimeout(()=>{
        this.subjects.forEach(obj => {
          obj.isChecked = this.masterCheck;
        });
      });
    }
    checkEvent() {
      const totalItems = this.subjects.length;
      let checked = 0;
      this.subjects.map(obj => {
        if (obj.isChecked) checked++;
      });
      if (checked > 0 && checked < totalItems) {
        this.isIndeterminate = true;
        this.masterCheck = false;
      } else if (checked == totalItems) {
        
        this.masterCheck = true;
        this.isIndeterminate = false;
      } else {
        this.isIndeterminate = false;
        this.masterCheck = false;
      }
    }
    SaveProfile(){
        console.log(this.subjects)
        this.afstore.collection('Students').doc(this.key.id).update({
          Subjects:[]
        });
        this.subjects.forEach(element => {
          if(element.isChecked){
            this.afstore.collection('Students').doc(this.key.id).update({
              Subjects:firestore.FieldValue.arrayUnion(element.val)
            })
          }
        });
        alert("Updated Suceesfully");
    }
}
