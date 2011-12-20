using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace Kendo
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Source",
                "web/{section}/{example}.src.html",
                new { controller = "Web", action = "Source" }
            );

            routes.MapRoute(
                "Web",
                "web/{section}/{example}.html",
                new { controller = "Web", action = "Index", section = "overview", example = "index" }
            );

            routes.MapRoute(
                "Index",
                "web/{section}",
                new { controller = "Web", action = "Index", section = "overview", example = "index" }
            );

            routes.MapRoute(
                "Static",
                "{assetGroup}/{assetType}/{*file}",
                new { controller = "Static", action = "Resource" },
                new { assetGroup = "(src|shared)",
                      assetType = "(js|styles)" }
            );

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
        }
    }
}
