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
        public ActionResult GetVehiclesFor(DateTime time)
        {
            return Json(new[]
                {
                    new Vehicle {Id = 1, Latitude = 12, LocationType = LocationType.DropOff, Longitude = 123, Name = "name", Notes = "long-long note", Time = DateTime.Now}
                });
        }

        [HttpGet]
        public ActionResult GetVehicles()
        {
            GetVehiclesFor(DateTime.UtcNow);
        }
    }
}
