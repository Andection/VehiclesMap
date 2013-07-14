Ext.define('VehiclesMap.model.Vehicle', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Name', {
        name: 'Time', type: 'date', dateFormat: 'MS'
    }, 'Latitude', 'Longitude', 'LocationType', 'Notes']
});