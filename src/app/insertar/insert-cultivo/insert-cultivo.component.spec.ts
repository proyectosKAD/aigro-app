import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCultivoComponent } from './insert-cultivo.component';

describe('InsertCultivoComponent', () => {
  let component: InsertCultivoComponent;
  let fixture: ComponentFixture<InsertCultivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCultivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
