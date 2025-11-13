export default interface Pedido {
    id?: string
    cliente: string
    plato: string
    cantidad: number 
    precioUnitario: number 
    estado: "pendiente" | "entregado" | "cancelado"
    fecha: Date 
}