<script setup>
    import { onMounted, ref } from 'vue';
    import { isAuthenticated } from './service/userInfo.js';

onMounted(() => {
    isAuthenticated.value = localStorage.getItem('token') !== null;
});

</script>

<template>
    <router-view />
</template>
