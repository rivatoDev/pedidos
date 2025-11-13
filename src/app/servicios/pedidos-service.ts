import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pedido from '../modelos/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private readonly URL = "http://localhost:3000/pedidos"

  constructor(private http: HttpClient) {}

  obtenerPedido(id: string) {
    return this.http.get<Pedido>(`${this.URL}/${id}`)
  }

  obtenerPedidos() {
    return this.http.get<Pedido[]>(this.URL)
  }

  agregarPedido(pedido: Pedido) {
    return this.http.post<Pedido>(this.URL, pedido)
  }

  editarPedido(pedido: Pedido) {
    return this.http.put<Pedido>(`${this.URL}/${pedido.id}`, pedido)
  }

  eliminarPedido(id: string) {
    return this.http.delete<Pedido>(`${this.URL}/${id}`)
  }
}