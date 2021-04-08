import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssigmentsComponent } from './assigments.component';

describe('AssigmentsComponent', () => {
  let component: AssigmentsComponent;
  let fixture: ComponentFixture<AssigmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
