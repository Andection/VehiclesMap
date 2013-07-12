Ext.define('VehiclesMap.controller.Vehicles', {
    extend: 'Ext.app.Controller',

    refs: [{
            ref: 'ManageMap',
            selector: 'manageMap'
        }, {
            ref: 'GMapPanel',
            selector: 'gmappanel'
        }],

    stores: ['Vehicles', 'VehiclesForDate'],
 
    init: function() {
        var store = this.getVehiclesStore();
        var self = this;
        store.load({
            callback: function(records, operation, success) {
                for (var i = 0; i < records.length; i++) {
                    var markerOptions = self.mapToMarkerOptions(records[i].data);
                    var map = self.getManageMap();
                    map.on('activate', function (a, s) {
                        p.addMarker(markerOptions);
                    }, self);
                }
            }
        });
    },

    mapToMarkerOptions: function(vehicleModel) {
        return {
            position: new google.maps.LatLng(vehicleModel.Latitude, vehicleModel.Longitude)
        };
    }
});