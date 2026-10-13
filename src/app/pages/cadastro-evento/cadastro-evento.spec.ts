import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroEvento } from './cadastro-evento';

describe('CadastroEvento', () => {
  let component: CadastroEvento;
  let fixture: ComponentFixture<CadastroEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEvento]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastroEvento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
