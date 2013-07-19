var MapOptionsMapper;
MapOptionsMapper = {
    mapToPolylineOptions: function(points) {
        return {
            path: points,
            strokeColor: '#0000FF',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            icons: [{
                repeat: '250px',
                icon: {
                    strokeColor: '#FF0000',
                    strokeWeight: 2,
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                }
            }]
        };
    },

    mapToMarkersOptions: function(vehicle) {
        var title = vehicle.Name + " " + vehicle.Time + " " + vehicle.LocationType;
        return {
            position: new google.maps.LatLng(vehicle.Latitude, vehicle.Longitude),
            title: title,
            icon: {
                url: this.getVehicleIconUrl(vehicle.LocationType)
            }
        };
    },

    getPoints: function(markers) {
        return Enumerable.From(markers)
            .Select(function(marker) {
                return new google.maps.LatLng(marker.Latitude, marker.Longitude);
            }).ToArray();
    },

    getVehicleIconUrl: function(locationType) {
        if (locationType == 2) {
            return '/content/images/truck.png';
        } else if (locationType == 1) {
            return '/content/images/drop_off.png';
        } else {
            return '/content/images/pick_up.png';
        }
    }
}