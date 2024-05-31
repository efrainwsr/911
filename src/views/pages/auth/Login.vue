<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import {saveToken, saveUserInfo, isAuthenticated} from '../../../service/userInfo.js';
import {config} from '../../../utils.js'



const user = ref('rrhh');
const password = ref('1234');
const errorMessage = ref('');

const router = useRouter();


const login = async () => {
    try {
        const res = await axios.post(`${config.apiBaseUrl}/api/auth/login`, {
            usuario: user.value,
            pwd: password.value
        });
        
        
        console.log(res)
        // Manejar la respuesta, por ejemplo, almacenar el token en localStorage
        saveToken(res.data.token);
        saveUserInfo(res.data.user)
        // router.push('/dashboard')
        //window.alert(`Bienvenido ${res.data.user.nombre}`)
        router.push('/dashboard');
        //console.log(res)
        // Redirigir a otra página o actualizar el estado de la aplicación
    } catch (err) {
        // Manejar errores de forma adecuada
        console.log(err.response, "err.response")
        if (err.response.data.message) {
            errorMessage.value = err.response.data.message || 'Error de autenticación';
            //loginError()
            console.log(errorMessage.value, 'estamos aqui')
        } else {
            errorMessage.value = 'Error de conexión con el servidor';
        }
    }
}



/*
const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});*/

const mainLogo = '../../../../public/main-logo.png'

</script>

<template>
    <div class="mt-5 surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <!-- <img :src="mainLogo" alt="Sakai logo" class="mb-5 w-12rem flex-shrink-0" /> -->
            <div style="border-radius: 56px; padding: 0.3rem;" class="shadow-2xl">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img :src="mainLogo" alt="Image" height="76" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Beinvenido</div>
                        <span class="text-600 font-medium">Inicia sesion para continuar</span>
                    </div>
                    
                    <div>
                        <label for="user" class="block text-900 text-xl font-medium mb-2">Usuario</label>
                        <InputText @keyup.native.enter="login" id="user" type="text" placeholder="Nombre de usuario" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user" />
                        
                        <label for="password" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password @keyup.native.enter="login" id="password" v-model="password" placeholder="Contraseña secreta" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        
                        
                        
                        <!--
                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label> 
                                </div>
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>-->
                            
                            <Button label="Inicar sesion" class="w-full p-3 text-xl bg-green-500" @click="login"></Button>
                            <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AppConfig simple />
    </template>
    
    <style scoped>
    .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
    }
    
    .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
    }
</style>