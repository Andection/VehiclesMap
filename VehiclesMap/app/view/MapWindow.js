Ext.define('VehiclesMap.view.MapWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.mapWindow',
    layout: 'fit',
    width: 500,
    height: 300,
    closeAction: 'hide',
    items: [
        {
            xtype: 'gmappanel',
            center: new google.maps.LatLng(42.339641, -71.094224),
            layout: 'fit',
        }]
});