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
                                new Vehicle
                                    {
                                        Id = 1,
                                        Latitude = 42.339641,
                                        LocationType = LocationType.DropOff,
                                        Longitude = -71.094224,
                                        Name = "name",
                                        Notes = "long-long note",
                                        Time = DateTime.Now
                                    }
                            },JsonRequestBehavior.AllowGet);
        }
        
        [HttpGet]
        public ActionResult GetVehicles()
        {
            return GetVehiclesFor(DateTime.UtcNow);
        }
    }
}