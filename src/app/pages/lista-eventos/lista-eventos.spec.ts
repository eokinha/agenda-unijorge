import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListaEventos } from './lista-eventos';

describe('ListaEventos', () => {
  let component: ListaEventos;
  let fixture: ComponentFixture<ListaEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEventos],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
