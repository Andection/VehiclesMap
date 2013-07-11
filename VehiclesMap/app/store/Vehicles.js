Ext.define('VehiclesMap.store.Vehicles', {
    extend: 'Ext.data.Store',
    requires: 'VehiclesMap.model.Vehicle',
    model: 'VehiclesMap.model.Vehicle',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'Vehicle/GetVehicles',
        reader: {
            type: 'json'
        }
    }
});