Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.define('VehiclesMap.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',

    requires: [
        'VehiclesMap.view.ManageMap',
        'VehiclesMap.view.GMapPanel',
    ],

    initComponent: function() {
        this.items = {
            dockedItems: [{
                dock: 'left',
                xtype: 'toolbar',
                items: [{
                    xtype: 'manageMap',
                    width: 100,
                }]
            }],
            items: [{
                    xtype: 'gmappanel',
                    center: new google.maps.LatLng(42.339641, -71.094224),
                    layout: 'fit',
                }],
            layout: 'fit',
        };
        this.callParent();
    }
});