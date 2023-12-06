import { Box, Button, CircularProgress, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import { modalStyle } from '../styles/modalStyle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addArea } from '../apis/addArea';
import { useContext, useState } from 'react';
import { IArea, Status } from '../interface/area';
import { updataArea } from '../apis/updataArea';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';

  interface AddGuestModalProps{
    modalState: boolean
    handleModal: () => void
    toggleDrawer: () => void
    area?: IArea
    title?: string
  }
export const AddAreaModal = ({ modalState, handleModal, toggleDrawer, area, title }: AddGuestModalProps) => {
  const { setNewAddedArea, areas, setNewAreas } = useContext(AppContext)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ successAdd, setSuccessAdd ] = useState<boolean>(false)
    const [ successEdit, setSuccessEdit ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            nombre: area ? area?.nombre : '',
            last_maintenance: area ? area?.last_maintenance : '',
            type: area ? area?.type : Status.available
        },
        onSubmit: async (values, { resetForm }) => {
            try{
              const { type, ...rest } = values
                setLoading(true)
                if(!area){
                  const newArea = {id: uuidv4(), type: type, ...rest} as IArea
                    await addArea(newArea)
                    setNewAddedArea(newArea)
                    setSuccessAdd(true)
                    resetForm()
                    handleModal()
                    toggleDrawer()
                }else{
                    await updataArea({id: area.id, ...values} as IArea)
                    const newArray = areas.map(areaMap => areaMap.id === area.id ? 
                      {
                        ...area, 
                        nombre: values.nombre,
                        last_maintenance: values.last_maintenance,
                        type: values.type,
                      } as IArea : areaMap);
                    
                    setNewAreas(newArray)
                    setSuccessEdit(true)
                    handleModal()
                }
            }catch(e){
                setError(true)
            }finally{
                setLoading(false)
                setTimeout(()=> setError(false), 3000)
                setTimeout(()=> setSuccessAdd(false), 3000)
                setTimeout(()=> setSuccessEdit(false), 3000)
            }
        },
        validationSchema: Yup.object({
            nombre: Yup.string().matches(/^[a-zA-ZñÑ ]+$/, 'El nombre debe contener solo letras').required('Campo requerido'),
            last_maintenance: Yup.date().required('Campo requerido'),
            type: Yup.string().required('Campo requerido'),
        })
    });
  return (
      <Modal
        open={modalState}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
            { error  ? <Snackbar
                            open={error}
                            autoHideDuration={3000}
                            message="Algo salió mal, Ups!!"
            /> :  null}
            { successAdd  ? <Snackbar
                            open={successAdd}
                            autoHideDuration={3000}
                            message="Agregado con exito"
            /> :  null}
            { successEdit  ? <Snackbar
                            open={successEdit}
                            autoHideDuration={3000}
                            message="Editado con exito"
            /> :  null}
            <Box sx={{display: 'flex', justifyContent:'space-between', marginBottom: 3}}>
              <Typography variant='h5' sx={{fontWeight: 'bold'}}>{title}</Typography>
              <Button color='error' onClick={handleModal}><CloseIcon/></Button>
            </Box>
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>

                <Grid item xs={6}>
                <TextField
                sx={{marginBottom: 3}}
                  id="nombre"
                  name="nombre"
                  label="Nombre"
                  type='text'
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
                <TextField
                sx={{marginBottom: 3}}
                  id="last_maintenance"
                  name="last_maintenance"
                  type='date'
                  value={formik.values.last_maintenance}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.last_maintenance && Boolean(formik.errors.last_maintenance)}
                  helperText={formik.touched.last_maintenance && formik.errors.last_maintenance}
                  />
              
                </Grid>

                <Grid item xs={6}>

            
                {/*<TextField
                sx={{marginBottom: 3}}
                  id="type"
                  name="type"
                  label="Estatus"
                  type="text"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                />*/}

                <Select
                  sx={{ marginBottom: 3 }}
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  displayEmpty
                  renderValue={(selected) => (selected ? selected : 'Selecciona un estatus')}
                >
                  {Object.values(Status).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              
                 </Grid>
             </Grid>
                <Button disabled={ loading } sx={{marginBottom: 3, alignSelf: 'flex-end', width: 150, height: 40, marginTop: 3}} type="submit" variant="outlined" color="primary">
                  {loading ? <CircularProgress size={20}/> : title === 'Editar' ? 'Guardar' : 'Agregar'}
                </Button>
             </form>
        </Box>
      </Modal>
  )
}
