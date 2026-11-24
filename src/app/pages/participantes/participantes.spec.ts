import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Participantes } from './participantes';

describe('Participantes', () => {
  let component: Participantes;
  let fixture: ComponentFixture<Participantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Participantes],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Participantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
