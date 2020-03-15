import { Component, OnInit } from '@angular/core';
import { userService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {
  classs
  board
  teacher
  main
  link
  name
  url
  type
  material
  subject
  SelectedSubjects
  busy: Boolean = false;
  std = new Array(5)


  constructor(public user: userService, private afstore: AngularFirestore, public afstorage: AngularFireStorage, private fileopener: FileOpener, private file: File, private transfer: FileTransfer) {
    for (let index = 0; index < 5; index++) {
      this.std[index] = index + 6;
    }
  }

  async ngOnInit() {
    try {
      this.type = this.user.gettype()
      if (this.type == 'S') {
        this.busy = true;
        this.classs = this.user.getclass();
        this.board = this.user.getboard();
        this.teacher = this.user.getTeacher();
        this.SelectedSubjects = this.user.getsubjects();

        if (this.SelectedSubjects.length == 0) {
          throw Error("Ask tutor to give access to subjects")
        }

        if (this.subject == undefined || this.subject == 'ALL')
          this.main = await this.afstore.collection(`${this.classs}`, ref => ref.where('author', '==', this.teacher).where('board', '==', this.board).where('subject', 'in', this.SelectedSubjects));
        else {
          let index = this.SelectedSubjects.indexOf(this.subject)

          if (index == -1) {
            alert("You havent Registered for this subject");
          }
          this.main = await this.afstore.collection(`${this.classs}`, ref => ref.where('author', '==', this.teacher).where('board', '==', this.board).where('subject', 'in', this.SelectedSubjects).where('subject', '==', this.subject));

        } await this.main.valueChanges().subscribe(event => {
          this.material = event
        });
        this.busy = false;
      }
    }
    catch (err) {
      alert(err)
    }

  }
  async viewforteacher() {
    this.busy = true;
    this.teacher = this.user.getName();
    if (this.subject == undefined || this.subject == 'ALL')
      this.main = await this.afstore.collection(`${this.classs}`, ref => ref.where('author', '==', this.teacher));
    else
      this.main = await this.afstore.collection(`${this.classs}`, ref => ref.where('author', '==', this.teacher).where('subject', '==', this.subject));
    await this.main.valueChanges().subscribe(event => {
      this.material = event
    });

    this.busy = false;
  }

  ViewPDF(key) {
    this.busy = true;
    try {
      let link = key.link;
      let path = this.file.dataDirectory
      const transfer = this.transfer.create()
      transfer.download(link, path + key.name).then(entry => {
        let url = entry.toURL();
        this.fileopener.open(url, 'application/pdf')
        this.busy = false;
      })
    }
    catch (err) {
      alert(err);
      this.busy = false;
    }

  }
  DeleteFile(event) {
    let link = event.link
    this.afstorage.storage.refFromURL(link).delete();
    this.main = this.afstore.collection(`${this.classs}`, ref => ref.where('link', '==', link));
    this.main.get().subscribe(delitems => delitems.forEach(doc => doc.ref.delete()));
    alert("The file was sucessfully deleted")
  }

}
