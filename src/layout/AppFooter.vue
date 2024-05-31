<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(()=>{
    return '../../../../public/main-logo.png'
});



</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="32" class="mr-2" />
        <span class="font-medium ml-1">Ven 9-1-1</span>
    </div>
</template>
