import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListeMatiereComponent } from './liste-matiere.component';

describe('ListeMatiereComponent', () => {
  let component: ListeMatiereComponent;
  let fixture: ComponentFixture<ListeMatiereComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
