const URL = 'http://localhost:5000/api/persona'

export const obtener = async() => {
    try {
        let response = await fetch(`${URL}/obtener`, {
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

export const guardar = async(persona)=>{
    try{
        let response = await fetch(`${URL}/guardar`, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona)
        });

        return await response.json()
    } catch(error){
        console.log(error)
    }
}

export const editar = async(persona, id)=>{
    try{
        let response = await fetch(`${URL}/editar/${id}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona)
        });

        return await response.json()
    } catch(error){
        console.log(error)
    }
}
export const borrar = async(id)=>{
    try{
        let response = await fetch(`${URL}/borrar/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        return await response.json()
    } catch(error){
        console.log(error)
    }
}