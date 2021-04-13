import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEleveComponent } from './view-eleve.component';

describe('ViewEleveComponent', () => {
  let component: ViewEleveComponent;
  let fixture: ComponentFixture<ViewEleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
