using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VehiclesMap.Model;

namespace VehiclesMap.Controllers
{
    public class VehiclesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetVehiclesFor(string date)
        {
            return Json(new[]
                {
                    VehiclePathGenerator.Generate(10, 1000, DateTime.UtcNow)
                }, JsonRequestBehavior.AllowGet);
        }

        private static class VehiclePathGenerator
        {
            private static readonly Random Random = new Random();
            private const double StartLatitude = 42.339641;
            private const double StartLongitude = -71.094224;

            public static Vehicle[] Generate(int vehicleCount, int pointCount, DateTime startTime)
            {
                IEnumerable<Vehicle> result = new List<Vehicle>();
                for (var id = 0; id < vehicleCount; id++)
                {
                    var pickUpCount = Random.Next(10);
                    var dropOffCount = Random.Next(10);

                    var currentLatitude = StartLatitude + (Random.Next(100000) / 10000.0 );
                    var currentLongitude = StartLongitude - (Random.Next(100000) / 10000.0 );
                    var pointTypeList = Enumerable.Range(0, pointCount - pickUpCount - dropOffCount - 1)
                                                  .Select(_ => LocationType.Other)
                                                  .Concat(Enumerable.Range(0, pickUpCount).Select(_ => LocationType.PickUp))
                                                  .Concat(Enumerable.Range(0, dropOffCount).Select(_ => LocationType.DropOff))
                                                  .OrderBy(_ => Guid.NewGuid())
                                                  .ToArray();

                    var copyId = id;
                    result = result.Concat(pointTypeList.Generate(new VehicleAggregation
                        {
                            Latitude = currentLatitude,
                            Longitude = currentLongitude,
                            Time = startTime
                        }, (locationType, aggregation) =>
                            {
                                aggregation.Latitude = GetNext(aggregation.Latitude);
                                aggregation.Longitude = GetNext(aggregation.Longitude);
                                aggregation.Time = aggregation.Time.AddMinutes(1);

                                return new Vehicle()
                                    {
                                        Id = copyId,
                                        Latitude = aggregation.Latitude,
                                        Longitude = aggregation.Longitude,
                                        Name = "vehicle" + copyId,
                                        LocationType = locationType,
                                        Notes = "",
                                        Time = aggregation.Time
                                    };
                            }));
                }
                var res= result.ToArray();
                return res;
            }

            private static double GetNext(double current)
            {
                return current + Random.Next(100000000) / 1000000000.0 - 0.0000005;
            }
            private class VehicleAggregation
            {
                public double Latitude { get; set; }
                public double Longitude { get; set; }
                public DateTime Time { get; set; }
            }
        }
    }

    public static class EnumerableExt
    {
        public static IEnumerable<TResult> Generate<TSource, TAggregation, TResult>(this IEnumerable<TSource> collection, TAggregation aggregation,
                                                                                    Func<TSource, TAggregation, TResult> func)
        {
            return collection.Select(elem => func(elem, aggregation)).ToList();
        }
    }
}