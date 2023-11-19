import { GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
    },
    {
      field: 'last_maintenance',
      headerName: 'Último mantenimiento',
      width: 150,
    },
    {
      field: 'type',
      headerName: 'status',
      type: 'date',
      width: 150,
    },
  ];
  