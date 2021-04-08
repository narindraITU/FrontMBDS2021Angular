import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleMatiereComponentComponent } from './single-matiere-component.component';

describe('SingleMatiereComponentComponent', () => {
  let component: SingleMatiereComponentComponent;
  let fixture: ComponentFixture<SingleMatiereComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMatiereComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatiereComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
