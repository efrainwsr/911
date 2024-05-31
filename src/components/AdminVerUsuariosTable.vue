<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/service/CustomerService';

onMounted(() => {
    loading.value = true;

    lazyParams.value = {
        first: 0,
        rows: 10,
        sortField: null,
        sortOrder: null,
        filters: filters.value
    };

    loadLazyData();
});

const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const customers = ref([]);
const selectedCustomers = ref([]);
const selectAll = ref(false);
const first = ref(0);
const filters = ref({
    'nombre': { value: '', matchMode: 'contains' },
    'usuario': { value: '', matchMode: 'contains' },
    'tipo': { value: '', matchMode: 'contains' }
});
const lazyParams = ref({});
const columns = ref([
    { field: 'nombre', header: 'Nombre' },
    { field: 'usuario', header: 'Usuario' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'status', header: 'Status' }
]);

const loadLazyData = (event) => {
    loading.value = true;
    lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };

    setTimeout(() => {
        CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyParams.value) }).then((data) => {
            customers.value = data;
            totalRecords.value = data.length;  // Ajustar según la estructura de los datos
            loading.value = false;
        });
    }, Math.random() * 1000 + 250);
};

const onPage = (event) => {
    lazyParams.value = event;
    loadLazyData(event);
};
const onSort = (event) => {
    lazyParams.value = event;
    loadLazyData(event);
};
const onFilter = (event) => {
    lazyParams.value.filters = filters.value;
    loadLazyData(event);
};
const onSelectAllChange = (event) => {
    selectAll.value = event.checked;

    if (selectAll.value) {
        CustomerService.getCustomers().then(data => {
            selectAll.value = true;
            selectedCustomers.value = data;
        });
    } else {
        selectAll.value = false;
        selectedCustomers.value = [];
    }
};
const onRowSelect = () => {
    selectAll.value = selectedCustomers.value.length === totalRecords.value;
};
const onRowUnselect = () => {
    selectAll.value = false;
};

</script>

<template>
    <div class="card p-fluid">
        <h5>Usuarios registrados</h5>
        <DataTable 
            :value="customers" 
            lazy paginator 
            :first="first" 
            :rows="10" 
            v-model:filters="filters" 
            ref="dt" 
            dataKey="usuario_id"
            :totalRecords="totalRecords" 
            :loading="loading" 
            @page="onPage($event)" 
            @sort="onSort($event)" 
            @filter="onFilter($event)" 
            filterDisplay="row"
            :globalFilterFields="['nombre','usuario', 'tipo', 'status']"
            v-model:selection="selectedCustomers" 
            :selectAll="selectAll" 
            @select-all-change="onSelectAllChange" 
            @row-select="onRowSelect" 
            @row-unselect="onRowUnselect" 
            tableStyle="min-width: 75rem"
        >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="nombre" header="Nombre" filterMatchMode="contains" sortable>
                <template #filter="{filterModel,filterCallback}">
                    <InputText 
                        type="text" 
                        v-model="filterModel.value" 
                        @keydown.enter="filterCallback()" 
                        class="p-column-filter" 
                        placeholder="Buscar"
                    />
                </template>
            </Column>
            <Column field="usuario" header="Usuario" filterMatchMode="contains" sortable>
                <template #filter="{filterModel,filterCallback}">
                    <InputText 
                        type="text" 
                        v-model="filterModel.value" 
                        @keydown.enter="filterCallback()" 
                        class="p-column-filter" 
                        placeholder="Buscar"
                    />
                </template>
            </Column>
            <Column field="tipo" header="Tipo" filterMatchMode="contains" sortable>
                <template #filter="{filterModel,filterCallback}">
                    <InputText 
                        type="text" 
                        v-model="filterModel.value" 
                        @keydown.enter="filterCallback()" 
                        class="p-column-filter" 
                        placeholder="Buscar"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
