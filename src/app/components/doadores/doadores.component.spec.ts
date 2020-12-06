import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoadoresComponent } from './doadores.component';

describe('DoadoresComponent', () => {
  let component: DoadoresComponent;
  let fixture: ComponentFixture<DoadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
