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
            return Json(new[]
                            {
                                new Vehicle
                                    {
                                        Id = 1,
                                        Latitude = 42.339641 + dateTime.DayOfYear/10.0,
                                        LocationType = LocationType.DropOff,
                                        Longitude = -71.094224 - dateTime.DayOfYear/10.0,
                                        Name = "name",
                                        Notes = "long-long note",
                                        Time = dateTime,
                                        IsActual = true
                                    }
                            }, JsonRequestBehavior.AllowGet);
        }
    }
}