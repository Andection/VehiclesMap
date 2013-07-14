Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.define('VehiclesMap.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',

    requires: [
        'VehiclesMap.view.ManageMap',
        'VehiclesMap.view.MapPanel'
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
                xtype: 'mapPanel',
                layout:'fit'
                }],
            layout: 'fit',
        };
        this.callParent();
    }
});