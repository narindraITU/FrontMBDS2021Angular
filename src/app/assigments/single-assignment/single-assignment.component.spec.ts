import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleAssignmentComponent } from './single-assignment.component';

describe('SingleAssignmentComponent', () => {
  let component: SingleAssignmentComponent;
  let fixture: ComponentFixture<SingleAssignmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
