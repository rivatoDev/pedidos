import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFormulario } from './pedido-formulario';

describe('PedidoFormulario', () => {
  let component: PedidoFormulario;
  let fixture: ComponentFixture<PedidoFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
