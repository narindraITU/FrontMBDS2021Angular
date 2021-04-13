import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendreModalComponent } from './rendre-modal.component';

describe('RendreModalComponent', () => {
  let component: RendreModalComponent;
  let fixture: ComponentFixture<RendreModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendreModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
