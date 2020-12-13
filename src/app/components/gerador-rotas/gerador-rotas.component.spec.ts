import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorRotasComponent } from './gerador-rotas.component';

describe('GeradorRotasComponent', () => {
  let component: GeradorRotasComponent;
  let fixture: ComponentFixture<GeradorRotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeradorRotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeradorRotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
