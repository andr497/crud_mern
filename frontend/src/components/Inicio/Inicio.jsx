import React,{ useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper, ButtonGroup, Button } from '@material-ui/core';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import useStyles from './styles'

const Inicio = () => {

    const [persona, setPersona] = useState([]);
    const classes = useStyles();

    useEffect(()=>{
        const fetchData = async()=>{
            const result=await axios.get(
                'http://localhost:5000/api/obtenerPersona'
            );

            setPersona(result.data);
        }
        fetchData();
    }, [])

    const { estado, error, datos } = persona;

    return(
        <Grow in>
            <Container>
                <Grid container>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className={classes.tableHeader}>
                                    <TableCell component="th" scope="row">Nombre</TableCell>
                                    <TableCell component="th" scope="row">Apellido</TableCell>
                                    <TableCell component="th" scope="row">Correo</TableCell>
                                    <TableCell component="th" scope="row">Telefono</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    datos?.map((p, i) => (
                                        <TableRow key={p._id}>
                                            <TableCell>{p.nombre}</TableCell>
                                            <TableCell>{p.apellido}</TableCell>
                                            <TableCell>{p.email}</TableCell>
                                            <TableCell>{p.telefono}</TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup variant="contained" aria-label="contained button group">
                                                    <Button color="primary">Editar</Button>
                                                    <Button color="secondary">Eliminar</Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid> 
            </Container>
        </Grow>
    )
}

export default Inicio;