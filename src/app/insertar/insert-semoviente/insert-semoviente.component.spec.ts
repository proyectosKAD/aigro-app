import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSemovienteComponent } from './insert-semoviente.component';

describe('InsertSemovienteComponent', () => {
  let component: InsertSemovienteComponent;
  let fixture: ComponentFixture<InsertSemovienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertSemovienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
