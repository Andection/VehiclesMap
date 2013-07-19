/// <reference path="../../Scripts/linq.js" />
/// <reference path="../Mapper/MapOptionsMapper.js" />

Ext.define('VehiclesMap.controller.MapController', {
    extend: 'Ext.app.Controller',
    requires: ['VehiclesMap.view.MapPanel'],
    refs: [{
        ref: 'GMapPanel',
        selector: 'gmappanel',
        xtype: 'gmappanel',
    }, {
        ref: 'MapPanel',
        selector: 'mapPanel'
    }],
    stores: ['VehiclesForDate'],

    init: function () {
        var currentDate = localStorage.getItem('ShareDate');
        if (currentDate) {
            this.loadVehiclesForDate(currentDate);
        }
        var self = this;
        window.addEventListener('storage', function (e) {
            if (e.newValue) {
                var newDate = new Date(e.newValue);
                self.loadVehiclesForDate(newDate);
            }
        }, false);
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
                                            return  r.LocationType != 2;
                                        })
                                        .Select(function(m) {
                                            return MapOptionsMapper.mapToMarkersOptions(m);
                                        })
                                        .Concat([lastMarker])
                                        .ToArray();
                    return res;
                })
                .ToArray();
            var pointsList=markersGroupedById.Select(function(record) {
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