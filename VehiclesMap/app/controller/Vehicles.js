/// <reference path="../../Scripts/linq.js" />
/// <reference path="../Mapper/MapOptionsMapper.js" />

Ext.define('VehiclesMap.controller.Vehicles', {
    extend: 'Ext.app.Controller',
    refs: [{
            ref: 'ManageMap',
            selector: 'manageMap'
        }, {
            ref: 'GMapPanel',
            selector: 'gmappanel',
            xtype: 'gmappanel',
        }],
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
        localStorage.setItem('ShareDate', newValue);
    },

    onShowMapWindow: function() {
        window.open("Map");
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
            var allMarkers = Enumerable.From(records).SelectMany(function(r) {
                return r.raw;
            }).ToArray();
            var markersGroupedById = Enumerable.From(allMarkers)
                .GroupBy("x=>x.Id", "x=>x");
            var markers = markersGroupedById
                .SelectMany(function(r) {
                    var last = Enumerable.From(r.source)
                        .MaxBy('r=>r.Time');

                    var lastMarker = MapOptionsMapper.mapToMarkersOptions(last);

                    var res = Enumerable.From(r.source)
                        .Where(function(r) {
                            return r.LocationType != 2;
                        })
                        .Select(function(m) {
                            return MapOptionsMapper.mapToMarkersOptions(m);
                        })
                        .Concat([lastMarker])
                        .ToArray();
                    return res;
                })
                .ToArray();
            var pointsList = markersGroupedById.Select(function(record) {
                return MapOptionsMapper.getPoints(record.source);
            }).ToArray();
            map.clearMarkers();
            Enumerable.From(markers).ForEach(function(marker) {
                map.addMarker(marker);
            });
            Enumerable.From(pointsList).ForEach(function(points) {
                map.addPolyline(MapOptionsMapper.mapToPolylineOptions(points));
            });
        }
    }
});