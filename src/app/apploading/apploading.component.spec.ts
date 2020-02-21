import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApploadingComponent } from './apploading.component';

describe('ApploadingComponent', () => {
  let component: ApploadingComponent;
  let fixture: ComponentFixture<ApploadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApploadingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
