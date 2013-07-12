Ext.define('VehiclesMap.store.Vehicles', {
    extend: 'Ext.data.Store',
    requires: 'VehiclesMap.model.Vehicle',
    model: 'VehiclesMap.model.Vehicle',

    autoLoad: true,
    proxy: {
        type: 'ajax',
        actionMethods: { read: 'GET'},
        url: 'Vehicles/GetVehicles',
        limitParam: undefined,
        pageParam: undefined,
        startParam: undefined,
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});