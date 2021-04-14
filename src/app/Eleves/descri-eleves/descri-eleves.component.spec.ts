import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriElevesComponent } from './descri-eleves.component';

describe('DescriElevesComponent', () => {
  let component: DescriElevesComponent;
  let fixture: ComponentFixture<DescriElevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriElevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
