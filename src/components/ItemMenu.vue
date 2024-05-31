<script setup>
const menuItems = defineProps({
    nombre: String,
    precio: Number,
    precioBs: Number,
    cant: Number,
    cat: Number
});
</script>

<template>
    <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-1">
                <div>
                    <span class="block text-500 font-lg mb-2 font-semibold" :class="{
                        'text-orange-600' : menuItems.cat === 1,
                        'text-green-600' : menuItems.cat === 2,
                        'text-yellow-600' : menuItems.cat === 3,
                        'text-pink-600' : menuItems.cat === 4,
                        'text-black-600' : menuItems.cat === 5,
                        'text-cyan-600' : menuItems.cat === 6,
                        'shadow-cyan' : menuItems.cat === 5
                    }">{{ menuItems.nombre.toUpperCase() }}</span>
                    <div class="inline text-900 font-medium mr-4">$ {{ menuItems.precio.toFixed(2) }}</div>
                    <div class="inline text-900 font-medium ">Bs. {{ menuItems.precioBs.toFixed(2) }}</div>
                </div>
                <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                    <Button icon="pi pi-minus" severity="danger" text/>
                </div>
                <div @click="add" class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                    <Button icon="pi pi-plus" severity="success" text/>
                </div>
            </div>
            <span class="text-500">Cant. </span>
            <span class="text-green-500 font-medium text-lg">{{ menuItems.cant }}</span>
        </div>
    </div>
</template>


<style>
    .shadow-black{
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    }
    .shadow-cyan{
        box-shadow: 0px 10px 15px -3px #059BB4;
    }
    
</style>