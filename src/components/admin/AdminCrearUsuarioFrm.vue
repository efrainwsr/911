<script setup>
import {ref, onMounted} from 'vue'
import { dptos } from '../service/adminService.js'

const dropDownDptos = ref(null)
const getDptos = onMounted(async ()=>{ dropDownDptos.value =  await dptos();
});

const newUser = ref({
    dpto_id: null,
    nombre: '',
    usuario: '',
})

</script>

<template>
    <div class="col-12">
        <div class="card">
            <h5>Crear usuario</h5>
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-6">
                    <label for="nombre">Nombre</label>
                    <InputText id="nombre" type="text" />
                </div>
                <div class="field col-12 md:col-6">
                    <label for="lastname2">Lastname</label>
                    <InputText id="lastname2" type="text" />
                </div>
                <div class="field col-12">
                    <label for="address">Address</label>
                    <Textarea id="address" rows="4" />
                </div>
                <div class="field col-12 md:col-6">
                    <label for="city">City</label>
                    <InputText id="city" type="text" />
                </div>
                <div class="field col-12 md:col-3">
                    <label for="dpto">Departamento</label>
                    <Dropdown class="capitalize" id="dpto" v-model="newUser.dpto_id" :options="dropDownDptos" optionLabel="name" placeholder="Seleccione..."></Dropdown>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="zip">Zip</label>
                    <InputText id="zip" type="text" />
                </div>
            </div>
        </div>
    </div>
</template>
