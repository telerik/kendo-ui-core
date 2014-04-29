using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : Controller
    {
        public ActionResult SiteMapBinding()
        {
            if (!SiteMapManager.SiteMaps.ContainsKey("sample"))
            {
                SiteMapManager.SiteMaps.Register<XmlSiteMap>("sample", sitmap =>
                    sitmap.LoadFrom("~/sample.sitemap"));
            }
            return View();
        }
    }
}
