Ext.define('VehiclesMap.store.VehiclesForDate', {
    extend: 'Ext.data.Store',
    requires: 'VehiclesMap.model.Vehicle',
    model: 'VehiclesMap.model.Vehicle',

    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        url: 'Vehicles/GetVehiclesFor',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});