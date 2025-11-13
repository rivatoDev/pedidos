import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAgregar } from './pedido-agregar';

describe('PedidoAgregar', () => {
  let component: PedidoAgregar;
  let fixture: ComponentFixture<PedidoAgregar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoAgregar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoAgregar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
