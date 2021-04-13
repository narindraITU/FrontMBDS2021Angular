import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMatiereComponent } from './view-matiere.component';

describe('ViewMatiereComponent', () => {
  let component: ViewMatiereComponent;
  let fixture: ComponentFixture<ViewMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
