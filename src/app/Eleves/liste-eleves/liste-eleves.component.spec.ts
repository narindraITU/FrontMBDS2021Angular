import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeElevesComponent } from './liste-eleves.component';

describe('ListeElevesComponent', () => {
  let component: ListeElevesComponent;
  let fixture: ComponentFixture<ListeElevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeElevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
