Ext.define('VehiclesMap.view.MapPanel', {
    extend: 'Ext.Container',
    alias: 'widget.mapPanel',
    requires: [
        'VehiclesMap.view.GMapPanel'
    ],
    initComponent: function() {
        this.items = {
            items: [{
                xtype: 'gmappanel',
                center: new google.maps.LatLng(42.339641, -71.094224),
                layout: 'fit'
            }],
            layout: 'fit'
        };

        this.callParent();
    }
});