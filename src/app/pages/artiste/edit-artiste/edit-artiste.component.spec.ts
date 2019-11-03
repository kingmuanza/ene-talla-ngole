import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtisteComponent } from './edit-artiste.component';

describe('EditArtisteComponent', () => {
  let component: EditArtisteComponent;
  let fixture: ComponentFixture<EditArtisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArtisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArtisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
