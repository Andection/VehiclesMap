﻿/// <reference path="../../Scripts/linq.js" />

Ext.define('VehiclesMap.controller.Vehicles', {
    extend: 'Ext.app.Controller',
    requires: ['VehiclesMap.view.MapWindow'],
    refs: [{
            ref: 'ManageMap',
            selector: 'manageMap'
        }, {
            ref: 'MapPanel',
            selector: 'mapPanel'
        }, {
            ref: 'GMapPanel',
            selector: 'gmappanel',
            xtype: 'gmappanel',
        }, {
            ref: 'MapWindow',
            selector: 'mapWindow',
            xtype: 'mapWindow',
            autoCreate: true
        }],
    stores: ['VehiclesForDate'],

    init: function () {
        this.control({
            'manageMap button[action=showMapWindow]': {
                click: this.onShowMapWindow
            },
            'manageMap datefield': {
                change: this.onMapDateChanged,
                afterrender: function(field, options) {
                    field.setValue(new Date);
                }
            },
            'mapWindow': {
                close: function() {
                    var mapPanel = this.getMapPanel();
                    var map = this.getGMapPanel();
                    mapPanel.removeAll();
                    mapPanel.add(map);
                }
            }
        });
    },

    onMapDateChanged: function(field, newValue, oldValue, options) {
        this.loadVehiclesForDate(newValue);
    },

    onShowMapWindow: function () {
        var window = this.getMapWindow(); 
        var map = this.getGMapPanel();
        window.add(map);
        window.show();
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
    
    //todo:оптимизировать для большого кол-ва маркеров. отбросить не репрезентитивные. Возможно, сделать линию движения с иконками остановок и последней иконки машины
    onVehiclesStoreLoad: function(records, operation, success) {
        if (success) {
            var map = this.getGMapPanel();
            var allMarkers = Enumerable.From(records).SelectMany(function(r) {
                return r.raw;
            }).ToArray();
            var self = this;
            var markersGroupedById = Enumerable.From(allMarkers)
                .GroupBy("x=>x.Id", "x=>x");
            var markers = markersGroupedById
                .SelectMany(function(r) {
                    var last = Enumerable.From(r.source)
                        .MaxBy('r=>r.Time');

                    var lastMarker = self._mapToMarkersOptions(last, self);

                    var res = Enumerable.From(r.source)
                                        .Where(function(r) {
                                            return  r.LocationType != 2;
                                        })
                                        .Select(function(m) {
                                            return self._mapToMarkersOptions(m, self);
                                        })
                                        .Concat([lastMarker])
                                        .ToArray();
                    return res;
                })
                .ToArray();
            var pointsList=markersGroupedById.Select(function(record) {
                return self._getPoints(record.source);
            }).ToArray();
            map.clearMarkers();
            Enumerable.From(markers).ForEach(function(marker) {
                map.addMarker(marker);
            });
            Enumerable.From(pointsList).ForEach(function(points) {
                map.addPolyline(points);
            });
        }
    },
        //todo: сделать красивые иконки
    _mapToMarkersOptions: function(vehicle, scope) {
        var title = vehicle.Name + " " + vehicle.Time + " " + vehicle.LocationType;
        return {
            position: new google.maps.LatLng(vehicle.Latitude, vehicle.Longitude),
            title: title,
            icon: {
                url: scope._getVehicleIconUrl(vehicle.LocationType)
            }
        };
    },
    
    _getPoints: function (markers) {
        return Enumerable.From(markers)
            .Select(function (marker) {
                return new google.maps.LatLng(marker.Latitude, marker.Longitude);
            }).ToArray();
    },

    _getVehicleIconUrl: function(locationType) {
        if (locationType == 2) {
                return '/content/images/truck.png';
        } else if(locationType==1) {
                return '/content/images/drop_off.png';
        } else {
                return '/content/images/pick_up.png';
        }
    }
});