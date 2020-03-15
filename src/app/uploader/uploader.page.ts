import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { userService } from '../user.service';
import { firestore, auth } from 'firebase/app'
import { async } from '@angular/core/testing';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  ref: AngularFireStorageReference
  task: AngularFireUploadTask
  uploadProgress: Observable<number>
  downloadURL: String
  uploadState: Observable<String>
  std = new Array(5)
  classs
  board
  subject
  busy: boolean = false
  desc
  constructor(private afStorage: AngularFireStorage, public afstore: AngularFirestore, private zone:NgZone,public user: userService, private file: File, private filechooser: FileChooser, private filepath: FilePath) {
    for (let index = 0; index < 5; index++) {
      this.std[index] = 6 + index;
    }
  }
  @ViewChild('fileButton', { static: true }) fileButton
  ngOnInit() {
  }


  async choosefile() {

    if (this.classs != undefined || this.board != undefined || this.subject != undefined) {
      this.busy = true;
      await this.filechooser.open().then(async uri => {
        await this.filepath.resolveNativePath(uri).then(resolvenativepath => {
          let dirPath = resolvenativepath
          let dirPathsegments = dirPath.split('/')
          let filename = dirPathsegments.pop()
          dirPath = dirPathsegments.join('/')
          this.file.readAsArrayBuffer(dirPath, filename).then(buffer => {
            this.uploadfile(buffer, filename)
          })
        }).catch(e => alert(e))
      }).catch(e => alert(e))
    }
    else {
      alert("Please select file Details first");
    }

  }
  uploadfile(buffer, filename) {

    const id = Math.random().toString(20).substring(2)

    let blob = new Blob([buffer], { type: 'application/pdf' })
    filename = filename.split('.')[0]
    this.ref = this.afStorage.ref(filename + "_" + id + ".pdf")
    this.task = this.ref.put(blob)
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state))
    this.zone.run(()=>{this.uploadProgress = this.task.percentageChanges();})
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.downloadURL = url
          let author = this.user.getName()
          let name = filename
          let board = this.board
          let link = this.downloadURL
          let classs = this.classs.toString()
          let subject = this.subject
          let desc = this.desc
          this.afstore.collection(`${classs}`).doc(id).set({
            name,
            link,
            author,
            board,
            subject,
            desc
          })
        });
      })
    ).subscribe();

    this.task.then(d => {
      alert("done")
      this.busy = false;
    }).catch(err => (alert(err)))


    this.afstore.doc(`Teachers/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(`${id}`)
    })
  }

}
