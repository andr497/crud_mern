import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab'

import useStyles from './styles'
import { guardar, editar } from '../../api/apiPersona';


const Form = ({ personaId, setPersonaId, setPersonas, personas = null }) => {
    const initialFormState = { nombre: "", apellido: "", email: "", telefono: "" }
    const classes = useStyles();
    const [personaData, setPersonaData] = useState(initialFormState)
    
    const [error, setError] = useState({})
    
    const { datos } = personas;
    const personaSeleccionada = datos?.filter((p)=>p._id===personaId)[0]

    useEffect(() => {
        if(personaSeleccionada) setPersonaData(personaSeleccionada)
    }, [personaSeleccionada]);

    const clear = () => {
        setError({})
        setPersonaId(null);
        setPersonaData(initialFormState)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(personaId){
            console.log("Editar registro")
            console.log(personaId)
            editar(personaData, personaId).then((response) => {
                if(response.estado){
                    setPersonas({...personas, datos: datos.map(pd => [response.datos].find(rd => rd._id === pd._id) || pd)})
                    clear();
                } else {
                    setError({...response});
                }
                console.log(personas)
            })
        }
        else{
            console.log("Nuevo registro")
            guardar(personaData).then((response) => {
                if(response.estado){
                    setPersonas({...personas, ...datos.push(response.datos)})
                    clear();
                } else {
                    setError({...response});
                }
            })
        }
    }

    return (
        <Paper className={ classes.paper }>
            <form className={ `${classes.root} ${classes.form}` } noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h6">{personaId ? 'Editar' : 'Agregar'} contacto </Typography>
                {
                    error?.error ? (
                        <Alert variant="filled" severity="error">
                            {error?.mensaje}
                        </Alert>
                    ) : (
                        null
                    )
                }
                <TextField
                    variant="outlined"
                    id="nombre" 
                    name="nombre" 
                    label="Nombre" 
                    value={personaData?.nombre}
                    onChange={(e)=>setPersonaData({ ...personaData, nombre: e.target.value })}
                    required
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    id="apellido"
                    name="apellido" 
                    label="Apellido" 
                    value={personaData?.apellido}
                    onChange={(e)=>setPersonaData({ ...personaData, apellido: e.target.value })}
                    required
                    fullWidth 
                />
                <TextField
                    variant="outlined"
                    id="email" 
                    name="email" 
                    label="Email"
                    type="email" 
                    value={personaData?.email}
                    onChange={(e)=>setPersonaData({ ...personaData, email: e.target.value })}
                    required
                    fullWidth 
                />
                <TextField
                    variant="outlined"
                    id="telefono"
                    name="telefono" 
                    label="Telefono" 
                    value={personaData?.telefono}
                    onChange={(e)=>setPersonaData({ ...personaData, telefono: e.target.value })}
                    required
                    fullWidth 
                />
                
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth={true}>
                    { personaId ? 'Editar' : 'Guardar' }
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth={true}>Limpiar formulario</Button>
            </form>
        </Paper>    
    );
}

export default Form;