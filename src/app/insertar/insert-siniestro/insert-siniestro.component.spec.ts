import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSiniestroComponent } from './insert-siniestro.component';

describe('InsertSiniestroComponent', () => {
  let component: InsertSiniestroComponent;
  let fixture: ComponentFixture<InsertSiniestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertSiniestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
