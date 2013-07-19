Ext.application({
    name: 'VehiclesMap',
    autoCreateViewport: false,
    controllers: ['MapController'],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype: 'mapPanel',
                layout: 'fit'
            }]
        });
    }
});