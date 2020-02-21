import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentdetailsPage } from './studentdetails.page';

describe('StudentdetailsPage', () => {
  let component: StudentdetailsPage;
  let fixture: ComponentFixture<StudentdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
