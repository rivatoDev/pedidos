import { Component, OnInit } from '@angular/core';
import Pedido from '../../modelos/pedido';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidosService } from '../../servicios/pedidos-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-lista',
  imports: [FormsModule],
  templateUrl: './pedidos-lista.html',
  styleUrl: './pedidos-lista.css',
})
export class PedidosLista implements OnInit {
  pedidos: Pedido[] = []

  filtroCliente!: string
  filtroEstado!: "pendiente" | "entregado" | "cancelado"

  ordenCliente!: "asc" | "desc" | ""
  ordenTotal!: "asc" | "desc" | ""

  constructor(
    private servicio: PedidosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerPedidos()
  }

  obtenerPedidos() {
    this.servicio.obtenerPedidos().subscribe({
      next: data => { this.pedidos = data },
      error: error => { alert("Ocurrio un error al buscar los pedidos: " + error) }
    })
  }

  filtrarYOrdenar() {
    let pedidosFiltrados: Pedido[] = [...this.pedidos]

    if (this.filtroCliente && this.filtroCliente?.trim() != "") {
      pedidosFiltrados = pedidosFiltrados.filter((pedido) => pedido.cliente.toLowerCase().includes(this.filtroCliente.toLowerCase()))
    }

    if (this.filtroEstado && this.filtroEstado.trim() != "") {
      pedidosFiltrados = pedidosFiltrados.filter((pedido) => pedido.estado === this.filtroEstado)
    }

    if (this.ordenCliente != "") {
      if (this.ordenCliente === "asc") {
        pedidosFiltrados = pedidosFiltrados.sort((a, b) => a.cliente.localeCompare(b.cliente))
      } else {
        pedidosFiltrados = pedidosFiltrados.sort((a, b) => b.cliente.localeCompare(a.cliente))
      }
    } 

    if (this.ordenTotal != "") {
        if (this.ordenTotal === "asc") {
          pedidosFiltrados = pedidosFiltrados.sort((a, b) => (a.precioUnitario * a.cantidad) - (b.precioUnitario * b.cantidad))
        } else {
          pedidosFiltrados = pedidosFiltrados.sort((a, b) => (b.precioUnitario * b.cantidad) - (a.precioUnitario * a.cantidad))
        }
      }

    return pedidosFiltrados
  }

  verDetalles(id: string) {
    this.router.navigate([`/pedidos/detalles/${id}`])
  }

  editar(id: string) {
    this.router.navigate([`/pedidos/editar/${id}`])
  }

  eliminar(id: string) {
    this.servicio.eliminarPedido(id).subscribe({
      next: data => { alert("Se elimino el pedido exitosamente: " + data), this.obtenerPedidos() },
      error: error => { alert("Ocurrio un error al eliminar el pedido: " + error) }
    })
  }
}