import { Routes } from '@angular/router';
import { PedidosLista } from './paginas/pedidos-lista/pedidos-lista';
import { PedidoAgregar } from './paginas/pedido-agregar/pedido-agregar';
import { PaginaDetallesPedido } from './paginas/pagina-detalles-pedido/pagina-detalles-pedido';
import { PedidoEditar } from './paginas/pedido-editar/pedido-editar';

export const routes: Routes = [
    {path: '', redirectTo: '/pedidos', pathMatch: 'full'},
    {path: 'pedidos', component: PedidosLista},
    {path: 'pedidos/agregar', component: PedidoAgregar},
    {path: 'pedidos/editar/:id', component: PedidoEditar},
    {path: 'pedidos/detalles/:id', component: PaginaDetallesPedido},
];
