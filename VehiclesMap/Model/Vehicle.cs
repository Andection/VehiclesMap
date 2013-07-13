using System;
using System.ComponentModel.DataAnnotations;

namespace VehiclesMap.Model
{
    public class Vehicle
    {
        public long Id { get; set; }
        public bool IsActual { get; set; }
        public string Name { get; set; }
        public DateTime Time { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
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