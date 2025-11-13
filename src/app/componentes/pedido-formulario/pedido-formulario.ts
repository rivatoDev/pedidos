import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Pedido from '../../modelos/pedido';
import { PedidosService } from '../../servicios/pedidos-service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-pedido-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './pedido-formulario.html',
  styleUrl: './pedido-formulario.css',
})
export class PedidoFormulario implements OnInit {
  formulario!: FormGroup
  id!: string

  pedidos: Pedido[] = []
  pedidoRepetido!: Pedido | undefined

  constructor(
    private servicio: PedidosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  get controles() {
    return this.formulario.controls
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      cliente: ['', [Validators.required, Validators.minLength(3)]],
      plato: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      precioUnitario: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      estado: ['', Validators.required], //Como se usa un select ya se valida que solo puede tener tres valores
      fecha: ['', Validators.required]
    })
    this.id = this.route.snapshot.params['id']
    if(this.id) {
      this.servicio.obtenerPedido(this.id).subscribe({
        next: data => {this.formulario.patchValue(data)},
        error: error => {alert("Ocurrio un error al buscar al pedido: " + error)}
      })
      this.formulario.markAllAsTouched()
    }

    combineLatest([
      this.servicio.obtenerPedidos(),
      this.controles['cliente'].valueChanges.pipe(startWith(this.controles['cliente'].value), debounceTime(300), distinctUntilChanged()),
      this.controles['plato'].valueChanges.pipe(startWith(this.controles['plato'].value), debounceTime(300), distinctUntilChanged())
    ]).pipe(
      map(([pedidos, cliente, plato]) => {
        return pedidos.find(pedido =>
          pedido.id != this.id &&
          pedido.cliente?.toLowerCase().trim() === cliente?.toLowerCase().trim() &&
          pedido.plato?.toLowerCase().trim() === plato?.toLowerCase().trim()
        )
      })
    ).subscribe({
      next: data => {
        this.pedidoRepetido = data
        if (this.pedidoRepetido) {
          alert("Ya existe un pedido con ese plato y cliente")
        }
      },
      error: error => { alert("Ocurrio un error al validar el pedido: " + error) }
    })
  }

  obtenerPedidos() {
    this.servicio.obtenerPedidos().subscribe({
      next: data => this.pedidos = data,
      error: error => alert("ocurrio un problema al obtener los pedidos: " + error)
    })
  }

  enviarFormulario() {
    const pedido: Pedido = {id: this.id, ...this.formulario.value}
    const metodo = this.id
      ? this.servicio.editarPedido(pedido)
      : this.servicio.agregarPedido(pedido)
    if (this.formulario.valid && !this.pedidoRepetido) {
      metodo.subscribe({
        next: data => { 
          alert("Operacion realizada correctamente: " + data), 
          this.formulario.reset(),
          this.router.navigate(['/pedidos'])},
        error: error => { alert("Ocurrio un error al realizar la operacion: " + error) }
      })
    }
  }
}