import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOeuvreComponent } from './edit-oeuvre.component';

describe('EditOeuvreComponent', () => {
  let component: EditOeuvreComponent;
  let fixture: ComponentFixture<EditOeuvreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOeuvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
