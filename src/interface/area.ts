export interface IArea {
  id: string
  nombre: string
  last_maintenance: Date
  type: Status
  }
  
  
export enum Status{
  available = 'AVAILABLE',
  unavailable = 'UNAVAILABLE',
  maintenance = 'MAINTENANCE'
}