import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheMatiereComponent } from './fiche-matiere.component';

describe('FicheMatiereComponent', () => {
  let component: FicheMatiereComponent;
  let fixture: ComponentFixture<FicheMatiereComponent>;

  beforeEach(async(() => {
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
