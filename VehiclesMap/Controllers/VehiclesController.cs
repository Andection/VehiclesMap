using System;
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
            var dateTime = Convert.ToDateTime(date);
            var datiTime2 = dateTime.AddMinutes(30);
            var dateTime3 = datiTime2.AddMinutes(30);
            var dateTime4 = dateTime3.AddMinutes(30);
            return Json(new[]
                            {
                                new Vehicle
                                    {
                                        Id = 1,
                                        Latitude = 42.339641 + dateTime.Minute/10000.0,
                                        LocationType = LocationType.Other,
                                        Longitude = -71.094224 - dateTime.Hour/10000.0,
                                        Name = "name",
                                        Notes = "long-long note",
                                        Time = dateTime.AddMinutes(30)
                                    },
                                        new Vehicle
                                    {
                                        Id = 1,
                                        Latitude = 42.339641 + datiTime2.Minute/10000.0,
                                        LocationType = LocationType.Other,
                                        Longitude = -71.094224 - datiTime2.Hour/10000.0,
                                        Name = "name",
                                        Notes = "long-long note",
                                        Time = datiTime2
                                    },    new Vehicle
                                    {
                                        Id = 1,
                                        Latitude = 42.339641 + dateTime3.Minute/10000.0,
                                        LocationType = LocationType.DropOff,
                                        Longitude = -71.094224 - dateTime3.Hour/10000.0,
                                        Name = "name",
                                        Notes = "long-long note",
                                        Time = dateTime3
                                    }
                                    ,    new Vehicle
                                    {
                                        Id = 1,
                                        Latitude = 42.339641 + dateTime4.Minute/10000.0,
                                        LocationType = LocationType.PickUp,
                                        Longitude = -71.094224 - dateTime4.Hour/10000.0,
                                        Name = "name",
                                        Notes = "long-long note",
                                        Time = dateTime3
                                    }
                            }, JsonRequestBehavior.AllowGet);
        }
    }
}