import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDoadorComponent } from './cadastro-doador.component';

describe('CadastroDoadorComponent', () => {
  let component: CadastroDoadorComponent;
  let fixture: ComponentFixture<CadastroDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDoadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
