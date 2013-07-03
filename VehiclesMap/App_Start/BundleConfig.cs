using System.Web.Optimization;

namespace VehiclesMap.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/extjs").Include("~/Scripts/ext-all.js"));
            bundles.Add(new StyleBundle("~/Content/extjs").Include("~/extjs/resources/css/ext-all.css"));

            BundleTable.EnableOptimizations = true;
        }
    }
}