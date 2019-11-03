import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpositionComponent } from './list-exposition.component';

describe('ListExpositionComponent', () => {
  let component: ListExpositionComponent;
  let fixture: ComponentFixture<ListExpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
