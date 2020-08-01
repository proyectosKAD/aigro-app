import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { mensajeComponent } from './mensaje.component';

describe('ConsultarComponent', () => {
  let component: mensajeComponent;
  let fixture: ComponentFixture<mensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ mensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(mensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
