Ext.define('VehiclesMap.controller.Vehicles', {
    extend: 'Ext.app.Controller',


    //    views: ['ManageMap','GMapPanel'],
    refs: [{
        ref: 'ManageMap',
        selector: 'ManageMap'
    }, {
        ref: 'GMapPanel',
        selector: 'GMapPanel'
    }],
    
    stores: ['Vehicles', 'VehiclesForDate'],

    init: function() {
        var store = this.getVehiclesStore();
        console.log(store);
        store.load({
            callback: function(records, operation, success) {
                console.log(records, operation, success);
            },
            params: {}
        });
    }
});