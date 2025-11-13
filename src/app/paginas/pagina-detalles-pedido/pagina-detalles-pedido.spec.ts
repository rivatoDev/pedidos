import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDetallesPedido } from './pagina-detalles-pedido';

describe('PaginaDetallesPedido', () => {
  let component: PaginaDetallesPedido;
  let fixture: ComponentFixture<PaginaDetallesPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDetallesPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDetallesPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
