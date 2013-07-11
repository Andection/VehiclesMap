Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.define('VehiclesMap.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',

    requires: [
        'VehiclesMap.view.ManageMap',
        'VehiclesMap.view.GMapPanel'
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
            items: [
                {
                    xtype: 'gmappanel',
                    center: {
                        geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                        marker: { title: 'Fenway Park' }
                    },
                    markers: [{
                            lat: 42.339641,
                            lng: -71.094224,
                            title: 'Boston Museum of Fine Arts',
                            listeners: {
                                click: function(e) {
                                    Ext.Msg.alert('It\'s fine', 'and it\'s art.');
                                }
                            }
                        }, {
                            lat: 42.339419,
                            lng: -71.09077,
                            title: 'Northeastern University'
                        }],
                    layout: 'fit',
                }],
            layout: 'fit'
        };
        this.callParent();
    }
});