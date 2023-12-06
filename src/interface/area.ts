export interface IArea {
  id: string
  nombre: string
  last_maintenance: Date
  type: Status
}
  
  
export enum Status{
  available = 'Disponible',
  unavailable = 'No disponible',
  maintenance = 'En mantenimiento'
}