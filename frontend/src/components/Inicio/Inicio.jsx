import React,{ useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import axios from 'axios';

import useStyles from './styles'
import TableUser from '../TableUser/TableUser';
import Form from '../Form/Form';
import { obtener } from '../../api/apiPersona';

const Inicio = () => {
    
    const [personas, setPersonas] = useState([]);
    const [personaId, setPersonaId] = useState(null)
    const classes = useStyles();

    useEffect(()=>{
        const fetch = async() => {
            setPersonas(await obtener());
        }
        fetch();
    }, [])

    return(
        <Grow in>
            <Container>
                <Grid container className={ classes.mainContainer } justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={12} md={7}>
                        <TableUser personas={personas} setPersonas={setPersonas} personaId={personaId} setPersonaId={setPersonaId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Form personas={personas} setPersonas={setPersonas} personaId={personaId} setPersonaId={setPersonaId} />
                    </Grid>
                </Grid> 
            </Container>
        </Grow>
    )
}

export default Inicio;