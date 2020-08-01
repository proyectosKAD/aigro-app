import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSemovienteComponent } from './editar-semoviente.component';

describe('EditarSemovienteComponent', () => {
  let component: EditarSemovienteComponent;
  let fixture: ComponentFixture<EditarSemovienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSemovienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
