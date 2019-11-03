import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpositionComponent } from './edit-exposition.component';

describe('EditExpositionComponent', () => {
  let component: EditExpositionComponent;
  let fixture: ComponentFixture<EditExpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
