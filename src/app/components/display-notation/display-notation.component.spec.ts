import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNotationComponent } from './display-notation.component';

describe('DisplayNotationComponent', () => {
  let component: DisplayNotationComponent;
  let fixture: ComponentFixture<DisplayNotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
