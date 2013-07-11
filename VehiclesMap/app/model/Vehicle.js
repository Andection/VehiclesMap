Ext.define('vehiclesMap.model.Vehicle', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Name', 'Time', 'Latitude', 'Longitude', 'LocationType', 'Notes'],

    proxy: {
        type: 'ajax',
        url: 'Vehicle/GetVehicles',
        reader: {
            type: 'json'
        }
    }
});