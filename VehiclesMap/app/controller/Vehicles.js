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
    mapWindow: null,
    stores: ['VehiclesForDate'],

    init: function() {
        this.control({
            'manageMap button[action=showMapWindow]': {
                click: this.onShowMapWindow
            },
            'manageMap datefield': {
                change: this.onMapDateChanged,
                afterrender: function(field, options) {
                    field.setValue(new Date);
                }
            }
        });
    },

    onMapDateChanged: function(field, newValue, oldValue, options) {
        this.loadVehiclesForDate(newValue);
    },

    onShowMapWindow: function() {
        alert('Show map window');
        //   var map = this.getGMapPanel();
        //   if (!this.mapWindow) {
        //       this.mapWindow = Ext.create('Ext.window.Window', {
        //           layout: 'fit',
        //           width: 300,
        //           height: 300,
        //           items: [{
        //               xtype: 'gmappanel',
        //               center: map.center,
        //               layout: 'fit'
        //               //, markers: map.markers
        //           }]
        //       });
        //   }
        //   this.mapWindow.show();
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

    onVehiclesStoreLoad: function(records, operation, success) {
        if (success) {
            var map = this.getGMapPanel();
            var allMarkers = Enumerable.From(records).Select(function(r) {
                return r.data;
            }).ToArray();
            var self = this;
            var markers = Enumerable.From(allMarkers)
                .GroupBy("x=>x.Id", "x=>x")
                .SelectMany(function(r) {
                    var last = Enumerable.From(r.source)
                        .MaxBy('r=>r.Time');
                    console.log(last);
                    var lastMarker = self._mapToMarkersOptions(last,true,self);

                    var res = Enumerable.From(r.source)
                        .Except([last])
                        .Select(function(m) {
                            return self._mapToMarkersOptions(m, false,self);
                        })
                        .ToArray();
                    res.push(lastMarker);
                    return res;

                })
                .ToArray();
            map.clearMarkers();
            Enumerable.From(markers).ForEach(function(marker) {
                map.addMarker(marker);
            });
        }
    },

    _mapToMarkersOptions: function(vehicle, isActual, scope) {
        var title = vehicle.Name + " " + vehicle.Time + " " + vehicle.LocationType;
        return {
            position: new google.maps.LatLng(vehicle.Latitude, vehicle.Longitude),
            title: title,
            icon: {
                url: scope._getVehicleIcon(vehicle.LocationType, isActual),// '/content/images/vehicle.png',
                size: new google.maps.Size(420, 68)
            }
        };
    },
    _getVehicleIcon: function(locationType, isActual) {
        if (locationType == 2) {
            if (isActual) {
                return '/content/images/actual_truck.png';
            } else {
                return '/content/images/truck.png';
            }
        } else if(locationType==1) {
            if (isActual) {
                return '/content/images/actual_drop_off.png';
            } else {
                return '/content/images/drop_off.png';
            }
        } else {
            if (isActual) {
                return '/content/images/actual_pick_up.png';
            } else {
                return '/content/images/pick_up.png';
            }
        }
    }
});