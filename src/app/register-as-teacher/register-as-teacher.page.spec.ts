import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterAsTeacherPage } from './register-as-teacher.page';

describe('RegisterAsTeacherPage', () => {
  let component: RegisterAsTeacherPage;
  let fixture: ComponentFixture<RegisterAsTeacherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAsTeacherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAsTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
