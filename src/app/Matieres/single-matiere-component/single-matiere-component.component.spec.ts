import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatiereComponentComponent } from './single-matiere-component.component';

describe('SingleMatiereComponentComponent', () => {
  let component: SingleMatiereComponentComponent;
  let fixture: ComponentFixture<SingleMatiereComponentComponent>;

  beforeEach(async(() => {
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
