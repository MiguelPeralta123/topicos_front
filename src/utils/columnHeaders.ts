import { GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 250,
    },
    {
      field: 'last_maintenance',
      headerName: 'Último mantenimiento',
      width: 350,
    },
    {
      field: 'type',
      headerName: 'Estatus',
      width: 250,
    },
  ];
  