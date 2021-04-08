import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditEleveComponent } from './edit-eleve.component';

describe('EditEleveComponent', () => {
  let component: EditEleveComponent;
  let fixture: ComponentFixture<EditEleveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
