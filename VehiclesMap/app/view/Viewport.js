
Ext.define('VehiclesMap.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    requires: [
        'VehiclesMap.view.ManageMap'
      //  'VehiclesMap.lib.GMapPanel'
    ],
    
    initComponent: function() {
        this.items = {
               dockedItems: [{
                dock: 'left',
                xtype: 'toolbar',
                items: [{
                    xtype: 'manageMap',
                    width: 100
                }]
            }],
            //items: [{
            //    xtype: 'gmappanel',
            //    zoomLevel: 14,
            //    gmapType: 'map',
            //    mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
            //    mapControls: ['GSmallMapControl', 'GMapTypeControl', 'NonExistantControl']
            //}],
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
        };
        this.callParent();
    }
});