import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FicheMatiereComponent } from './fiche-matiere.component';

describe('FicheMatiereComponent', () => {
  let component: FicheMatiereComponent;
  let fixture: ComponentFixture<FicheMatiereComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
