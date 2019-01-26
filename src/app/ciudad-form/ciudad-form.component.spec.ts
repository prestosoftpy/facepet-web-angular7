import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadFormComponent } from './ciudad-form.component';

describe('CiudadFormComponent', () => {
  let component: CiudadFormComponent;
  let fixture: ComponentFixture<CiudadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiudadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
