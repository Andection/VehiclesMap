Ext.define('VehiclesMap.view.ManageMap', {
    extend: 'Ext.Container',
    alias: 'widget.manageMap',

    initComponent: function() {
        this.items = [{
            xtype: 'datefield',
            width: 100
        }, {
            xtype: 'button',
            width: 100,
            text: 'show map in window',
            action: 'showMapWindow'
        }];

        this.callParent();
    }
});