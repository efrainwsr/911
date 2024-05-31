import {config} from '../utils.js'
import axios from 'axios';

export async function dptos(){
    try {
        const {data} = await axios.post(`${config.apiBaseUrl}/api/dptos/getAll`,{},{
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const dropDown = data.result.map(dpto => ({
            name: dpto.nombre,
            code: dpto.dpto_id
        }));

        dropDown.push({name: 'Todo', code: 0 })

        return dropDown;
        
    } catch (err) {
        console.log(err)
    }
};

export async function saveUser(user){
    try{    
        const {data} = await axios.post(`${config.apiBaseUrl}/api/users/createUser`,user,{
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        })
    return data

    }catch(err){
        //console.log(err)
    }
}