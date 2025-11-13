import { Component, OnInit } from '@angular/core';
import Pedido from '../../modelos/pedido';
import { PedidosService } from '../../servicios/pedidos-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagina-detalles-pedido',
  imports: [],
  templateUrl: './pagina-detalles-pedido.html',
  styleUrl: './pagina-detalles-pedido.css',
})
export class PaginaDetallesPedido implements OnInit {
  id!: string
  pedido!: Pedido

  constructor(
    private servicio: PedidosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.obtenerPedido()
  }

  obtenerPedido() {
    this.servicio.obtenerPedido(this.id).subscribe({
      next: data => {this.pedido = data},
      error: error => {alert("Ocurrio un error al buscar el pedido: " + error)}
    })
  }

  volver() {
    this.router.navigate(['/pedidos'])
  }
}