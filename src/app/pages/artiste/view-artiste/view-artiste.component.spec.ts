import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArtisteComponent } from './view-artiste.component';

describe('ViewArtisteComponent', () => {
  let component: ViewArtisteComponent;
  let fixture: ComponentFixture<ViewArtisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArtisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArtisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
