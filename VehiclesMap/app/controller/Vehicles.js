/// <reference path="../../Scripts/linq.js" />

Ext.define('VehiclesMap.controller.Vehicles', {
    extend: 'Ext.app.Controller',
    refs: [{
            ref: 'ManageMap',
            selector: 'manageMap'
        }, {
            ref: 'GMapPanel',
            selector: 'gmappanel'
        }],
    mapWindow:null,
    stores: ['VehiclesForDate'],
 
    init: function() {
        this.control({
            'manageMap button[action=showMapWindow]': {
                click: this.onShowMapWindow
            },
            'manageMap datefield': {
                change: this.onMapDateChanged,
                afterrender: function (field, options) {
                    field.setValue(new Date);
                }
            }
        });
    },
    
    onMapDateChanged: function(field, newValue, oldValue, options) {
        this.loadVehiclesForDate(newValue);
    },

    onShowMapWindow: function() {
        var map = this.getGMapPanel();
        if (!this.mapWindow) {
            this.mapWindow = Ext.create('Ext.window.Window', {
                layout: 'fit',
                width: 300,
                height: 300,
                items: [{
                    xtype: 'gmappanel',
                    center: {
                        geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA'
                    },
                    layout: 'fit',
                    markers: map.markers
                }]
            });
        }
        this.mapWindow.show();
    },
    
    loadVehiclesForDate: function(date) {
        var store = this.getVehiclesForDateStore();
        store.load({
            callback: this.onVehiclesStoreLoad,
            scope: this,
            params: {
                date: date
            }
        });
    },
    
    onVehiclesStoreLoad: function (records, operation, success) {
        console.log(records, operation, success);
        if (success) {
            var map = this.getGMapPanel();
            var markers= Enumerable.From(records)
                .Select(function(record) {
                    var model = record.data;
                    var title = model.Name + " " + model.Time + " " + model.LocationType;
                    return {
                        position: new google.maps.LatLng(model.Latitude, model.Longitude),
                        title: title,
                        icon: {
                            url: '/content/images/vehicle.png'
                        }
                    };
                })
                .ToArray();
            map.clearMarkers();
            Enumerable.From(markers).ForEach(function(marker) {
                map.addMarker(marker);
            });
        }
    }
});