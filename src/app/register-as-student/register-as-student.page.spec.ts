import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterAsStudentPage } from './register-as-student.page';

describe('RegisterAsStudentPage', () => {
  let component: RegisterAsStudentPage;
  let fixture: ComponentFixture<RegisterAsStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAsStudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAsStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
