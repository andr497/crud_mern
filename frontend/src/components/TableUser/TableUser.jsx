import React from 'react';

import { Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper,
    IconButton, Tooltip, Typography } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import useStyles from './styles'
import { borrar } from '../../api/apiPersona';

const TableUser = ({personas, setPersonas, personaId, setPersonaId}) => {
    const classes = useStyles();

    const { estado, datos, error, mensaje } = personas
    
    const handleDelete = (e, id) => {
        e.preventDefault();

        if(id){
            console.log("Borrar registro")
            borrar(id).then((response) => {
                if(response.estado){
                    setPersonas({...personas, datos: personas.datos.filter((pd, i) => response.datos._id !== pd._id)})
                } 
                console.log(personas)
            })
        }
    }

    return(
        <TableContainer component={Paper}>
            <Typography variant="h5" align="center">Lista de contactos</Typography>
            <Table component="table" size="small" stickyHeader={true}>
                <TableHead component="thead">
                    <TableRow>
                        <TableCell component="th" scope="row">Nombre</TableCell>
                        <TableCell component="th" scope="row">Apellido</TableCell>
                        <TableCell component="th" scope="row">Correo</TableCell>
                        <TableCell component="th" scope="row">Telefono</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody component="tbody">
                    {
                        datos?.length > 0 ? (
                            datos?.map((p, i) => (
                                <TableRow hover={true} key={p._id}>
                                    <TableCell>{p.nombre}</TableCell>
                                    <TableCell>{p.apellido}</TableCell>
                                    <TableCell>{p.email}</TableCell>
                                    <TableCell>{p.telefono}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Editar" placement="left">
                                            <IconButton color="primary" size="small" onClick={() => { setPersonaId(p._id) }}><EditIcon/></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar" placement="right">
                                            <IconButton color="secondary" size="small" onClick={e => { handleDelete(e, p._id)}}><DeleteIcon/></IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow hover={true}>
                                <TableCell align="center" component="td" colSpan={5}>
                                    No hay contactos.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableUser;