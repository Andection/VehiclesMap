/**
 * @author Shea Frederick
 */
Ext.define('VehiclesMap.view.GMapPanel', {
    extend: 'Ext.panel.Panel',
    mapwin: null,
    alias: 'widget.gmappanel',
    _markers: [],
    _markersForAdd: [],
    _polylinehToAdd: [],
    _polylineList: [],

    initComponent: function() {
        Ext.applyIf(this, {
            plain: true,
            gmapType: 'map',
            border: false
        });

        this.callParent();
    },

    afterFirstLayout: function () {
        var center = this.center;
        this.callParent();

        if (center) {
            this.createMap(center);
        } else {
            Ext.Error.raise('center is required');
        }
    },

    createMap: function(center) {
        var options = Ext.apply({}, this.mapOptions);

        options = Ext.applyIf(options, {
            zoom: 14,
            center: center,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        this.gmap = new google.maps.Map(this.body.dom, options);

        Ext.each(this._markersForAdd, this.addMarker, this);
        Ext.each(this._polylinehToAdd, this.addPolyline, this);
        this._markersForAdd = [];
        this._polylinehToAdd = [];
        this.fireEvent('mapready', this, this.gmap);
    },

    addMarker: function (markerOptions) {
        if (!this.gmap) {
            this._markersForAdd.push(markerOptions);
            return;
        }
        markerOptions = Ext.apply({
            map: this.gmap
        }, markerOptions);

        if (!markerOptions.position) {
            markerOptions.position = new google.maps.LatLng(markerOptions.lat, markerOptions.lng);
        }
        var marker = new google.maps.Marker(markerOptions);
        Ext.Object.each(markerOptions.listeners, function (name, fn) {
            google.maps.event.addListener(o, name, fn);
        });
        this._markers.push(marker);
    },
    
    addPolyline: function(polylineOptions) {
        if (!this.gmap) {
            this._polylinehToAdd.push(polylineOptions);
            return;
        }
        var polyline = new google.maps.Polyline(polylineOptions);
        polyline.setMap(this.gmap);
        this._polylineList.push(polylineOptions);
    },
    
    clearMarkers: function () {
        Ext.each(this._markers, function (marker) {
            marker.setMap(null);
        }, this);
        
        Ext.each(this._polylineList, function (line) {
            line.setMap(null);
        }, this);
    },
    
    afterComponentLayout: function (w, h) {
        this.callParent(arguments);
        this.redraw();
    },

    redraw: function () {
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    }
});