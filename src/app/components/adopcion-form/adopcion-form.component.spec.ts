import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopcionFormComponent } from './adopcion-form.component';

describe('AdopcionFormComponent', () => {
  let component: AdopcionFormComponent;
  let fixture: ComponentFixture<AdopcionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopcionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopcionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
