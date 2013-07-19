/// <reference path="../../Scripts/linq.js" />

Ext.define('VehiclesMap.controller.MapController', {
    extend: 'Ext.app.Controller',
    requires: ['VehiclesMap.view.MapPanel'],
    refs: [ {
        ref: 'GMapPanel',
        selector: 'gmappanel',
        xtype: 'gmappanel',
    }, {
        ref: 'MapPanel',
        selector: 'mapPanel'
    }],
    stores: ['VehiclesForDate'],

    init: function () {
    }
});