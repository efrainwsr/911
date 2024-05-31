const mockData = [
    {
        usuario_id: 1,
        dpto_id: 4,
        nombre: "Efrain",
        usuario : "efrainwsr",
        pwd: "$2b$10$ohI2y1QryiRAXU6SUtouK.eXKNa98C/6tifWvY00KBtOJDqNDDWiK",
        roles: "0",
        created_at: "2024-04-16T04:00:00.000Z",
        updated_at: "2024-04-16T04:00:00.000Z",
        status: "activo",
        tipo: "administrador",
        avatar: "no-image.png"
    },
    {
        usuario_id: 2,
        dpto_id: 1,
        nombre: "rrhh",
        usuario: "rrhh",
        pwd: "$2b$10$kzLpnlN4EFjheV5ngwjQVeg4tOHPdjoROuD5jVohVAKcSHEgIyks2",
        roles: "1",
        created_at: "2024-04-16T04:00:00.000Z",
        updated_at: "2024-04-16T04:00:00.000Z",
        status: "activo",
        tipo: "corriente",
        avatar: "no-image.png"
    },
    {
        usuario_id: 3,
        dpto_id: 2,
        nombre: "efrain",
        usuario: "admin",
        pwd: "$2b$10$ThuUR2H3HPmcELb2maePyOlcX1hQGdmmaszGDC.OHFpaTEMWfhswa",
        roles: "2",
        created_at: null,
        updated_at: null,
        status: "activo",
        tipo: "corriente",
        avatar: "no-image.png"
    },
    {
        usuario_id: 4,
        dpto_id: 8,
        nombre: "KARELYS CORTEZ",
        usuario: "karl",
        pwd: "$2b$10$iJR1P887aqySggMMcNHLLuchjUtS6L/4Kf/3PQiJZyohdEjW4uiRi",
        roles: "8",
        created_at: "2024-05-29T04:00:00.000Z",
        updated_at: null,
        status: "activo",
        tipo: "corriente",
        avatar: "no-image.png"
    },
    {
        usuario_id: 5,
        dpto_id: 3,
        nombre: "prueba1",
        usuario: "prueba1",
        pwd: "$2b$10$89KfuWo7K4OUP4BfoPTroebtyW8uA4muSOFLFKSSvdmxUPkxvOwfS",
        roles: "3",
        created_at: "2024-05-29T04:00:00.000Z",
        updated_at: null,
        status: "activo",
        tipo: "corriente",
        avatar: "no-image.png"
    },
    {
        usuario_id: 6,
        dpto_id: 8,
        nombre: "juan alberto",
        usuario: "prueba0",
        pwd: "$2b$10$0jcSP46ihjfAEhczwHmYD.ylwXk/.dOoc1h9/pVWckmLE7XYJ8zGi",
        roles: "8",
        created_at: "2024-05-30",
        updated_at: null,
        status: "activo",
        tipo: "corriente",
        avatar: "no-image.png"
    }
];

export const CustomerService = {
    getCustomers() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockData), 50);
        });
    }
};
