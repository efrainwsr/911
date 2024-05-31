<script setup>
import { ref, onMounted } from 'vue';
import { dptos, saveUser } from '../service/adminService.js';
import { fechaActual, imgToBase64, compressImg, validateForm } from '../utils.js';
import * as yup from 'yup';


const dropDownDptos = ref(null);
const getDptos = onMounted(async () => {
  dropDownDptos.value = await dptos();
});

const userSchema = yup.object({
  dpto_id: yup.string().required('El departamento es obligatorio'),
  nombre: yup.string().required('El nombre es obligatorio'),
  usuario: yup.string().required('El usuario es obligatorio'),
  pwd: yup.string().required('La contraseña es obligatoria'),
  roles: yup.string().required('El acceso es obligatorio'),
  status: yup.string().required('El status es obligatorio'),
  tipo: yup.string().required('El tipo de usuario es obligatorio')
});

const dropDownStatus = ref([
  { name: 'Activo', code: 'activo' },
  { name: 'Inactivo', code: 'inactivo' },
]);

const dropDownTipo = ref([
  { name: 'Corriente', code: 'corriente' },
  { name: 'Administrador', code: 'administrador' },
  { name: 'Temporal', code: 'temporal' },
]);

const newUser = ref({
  dpto_id: null,
  nombre: null,
  usuario: null,
  pwd: null,
  roles: null,
  created_at: fechaActual(),
  updated_at: '0000-00-00',
  status: 'activo',
  tipo: 'corriente',
  avatar: null,
});

const errors = ref({});

/* const validateForm = async () => {
  try {
    await userSchema.validate(newUser.value, { abortEarly: false });
    errors.value = {};
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errors.value = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
    }
    return false;
  }
};*/

const sendUser = async () => {
    const validationResult = await validateForm(userSchema, newUser.value);
    if (!validationResult.isValid) {
        errors.value = validationResult.errors;
    } else {
        errors.value = {};
        // Continuar con el envío del formulario si es válido
        const data = await saveUser(newUser.value);
        console.log(data);
    }
};

const handleFileUpload = async (event) => {
  const file = event.files[0];
  const compressedImg = await compressImg(file, 3, 800);
  newUser.value.avatar = await imgToBase64(compressedImg);
};
</script>

<template>
  <div class="col-12">
    <div class="card">
      <h5>Crear usuario</h5>
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-4">
          <label for="nombre">Nombre</label>
          <InputText v-model="newUser.nombre" id="nombre" type="text" :class="{ 'p-invalid': errors.nombre }" />
          <small v-if="errors.nombre" class="p-error">{{ errors.nombre }}</small>
        </div>
        <div class="field col-12 md:col-4">
          <label for="usuario">Usuario</label>
          <InputText v-model="newUser.usuario" id="usuario" type="text" :class="{ 'p-invalid': errors.usuario }" />
          <small v-if="errors.usuario" class="p-error">{{ errors.usuario }}</small>
        </div>
        <div class="field col-12 md:col-4">
          <label for="dpto">Pertenece a:</label>
          <Dropdown v-model="newUser.dpto_id" class="capitalize" id="dpto" optionValue="code" :options="dropDownDptos" optionLabel="name" placeholder="Seleccione..." :class="{ 'p-invalid': errors.dpto_id }" />
          <small v-if="errors.dpto_id" class="p-error">{{ errors.dpto_id }}</small>
        </div>
        <div class="field col-12 md:col-3">
          <label for="roles">Tiene acceso a:</label>
          <Dropdown v-model="newUser.roles" class="capitalize" id="roles" optionValue="code" :options="dropDownDptos" optionLabel="name" placeholder="Seleccione..." :class="{ 'p-invalid': errors.roles }" />
          <small v-if="errors.roles" class="p-error">{{ errors.roles }}</small>
        </div>
        <div class="field col-12 md:col-3">
          <label for="status">Status</label>
          <Dropdown v-model="newUser.status" class="capitalize" id="status" optionValue="code" :options="dropDownStatus" optionLabel="name" placeholder="Seleccione..." :class="{ 'p-invalid': errors.status }" />
          <small v-if="errors.status" class="p-error">{{ errors.status }}</small>
        </div>
        <div class="field col-12 md:col-3">
          <label for="tipo">Tipo de usuario</label>
          <Dropdown v-model="newUser.tipo" class="capitalize" id="tipo" optionValue="code" :options="dropDownTipo" optionLabel="name" placeholder="Seleccione..." :class="{ 'p-invalid': errors.tipo }" />
          <small v-if="errors.tipo" class="p-error">{{ errors.tipo }}</small>
        </div>
        <div class="field col-12 md:col-3">
          <label for="pwd">Contraseña</label>
          <InputText v-model="newUser.pwd" id="pwd" type="text" :class="{ 'p-invalid': errors.pwd }" />
          <small v-if="errors.pwd" class="p-error">{{ errors.pwd }}</small>
        </div>
        <div class="field col-12 md:col-6">
          <label for="avatar">Foto de perfil</label>
          <FileUpload chooseLabel="Seleccione una foto" class="bg-green-500 hover:bg-green-600 border-none" v-model="newUser.avatar" id="avatar" :auto="true" mode="basic" name="avatar" accept="image/*" :maxFileSize="5000000" @select="handleFileUpload" />
          <small v-if="errors.avatar" class="p-error">{{ errors.avatar }}</small>
        </div>
        <div class="col-12 justify-content-center">
          <Button severity="success" label="Guardar" icon="pi pi-check" iconPos="right" @click="sendUser" />
        </div>
      </div>
    </div>
  </div>
</template>
