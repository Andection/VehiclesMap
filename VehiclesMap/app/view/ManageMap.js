Ext.define('VehiclesMap.view.ManageMap', {
    extend: 'Ext.Container',
    alias: 'widget.manageMap',

   // store: 'Stations',
   // title: 'Stations',
   // hideHeaders: true,

    initComponent: function() {
        this.items = [{
                xtype: 'datefield',
                width: 100
            }, {
                xtype: 'timefield',
                width: 100
            }];

        this.callParent();
    }
});