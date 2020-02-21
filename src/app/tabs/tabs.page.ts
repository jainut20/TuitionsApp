import { Component, OnInit,ViewChild, AfterViewChecked} from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { userService } from '../user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  type
  constructor(public user:userService) {
    this.type=this.user.gettype();
   }
  @ViewChild('tabs', {static: true}) tabs: IonTabs;
  ngOnInit() {
    console.log(this.tabs)
    this.tabs.select('material')
    this.type=this.user.gettype();
  }
  // ngAfterViewChecked(){
  //   this.tabs.select('material')
  //   this.type=this.user.gettype();
  // }
}
