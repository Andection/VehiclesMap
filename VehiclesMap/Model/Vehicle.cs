using System;
using System.ComponentModel.DataAnnotations;

namespace VehiclesMap.Model
{
    public class Vehicle
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime Time { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public LocationType LocationType { get; set; }
        [MaxLength(250)]
        public string Notes { get; set; }
    }

    public enum LocationType
    {
        PickUp,
        DropOff,
        Other
    }
}