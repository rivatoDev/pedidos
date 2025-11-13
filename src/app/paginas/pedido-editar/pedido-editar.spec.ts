import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEditar } from './pedido-editar';

describe('PedidoEditar', () => {
  let component: PedidoEditar;
  let fixture: ComponentFixture<PedidoEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
