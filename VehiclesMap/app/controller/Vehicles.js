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
                var markers = [];
                var map = self.getGMapPanel();
                for (var i = 0; i < records.length; i++) {
                    var markerOptions = self.mapToMarkerOptions(records[i].data);
                    markers.push(markerOptions);
                }

                map.markers = markers;
            }
        });
    },

    mapToMarkerOptions: function(vehicleModel) {
        return {
            position: new google.maps.LatLng(vehicleModel.Latitude, vehicleModel.Longitude)
        };
    }
});