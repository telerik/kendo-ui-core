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
            var suiteConstraint = new { suite = "(web|dataviz|mobile)" };

            routes.MapRoute(
                "MobileDeviceIndex",
                "m",
                new { controller = "MobileDevice", action = "Index" }
            );

            routes.MapRoute(
                "MobileDeviceExample",
                "m/{section}/{example}.html",
                new { controller = "MobileDevice", action = "Example" }
            );

           routes.MapRoute(
                "Source",
                "{suite}/{section}/{example}.src.html",
                new { controller = "Source", action = "Index" },
                suiteConstraint
            );

            routes.MapRoute(
                "Suite",
                "{suite}/{section}/{example}.html",
                new { controller = "Suite", action = "Index" },
                suiteConstraint
            );

            routes.MapRoute(
                "SectionIndex",
                "{suite}/{section}",
                new { controller = "Suite", action = "SectionIndex", section = "overview" },
                suiteConstraint
            );

            routes.MapRoute(
                "Debug",
                "src/{assetType}/{*file}",
                new { controller = "Debug", action = "Resource" },
                new { assetType = "(js|styles)" }
            );

            routes.MapRoute(
                "ThemeBuilder",
                "themebuilder/index.html",
                new { controller = "ThemeBuilder", action = "Index" }
            );

            routes.MapRoute(
                "ThemeBuilderIndex",
                "themebuilder",
                new { controller = "ThemeBuilder", action = "ThemeBuilderIndex" }
            );

            routes.MapRoute(
                "Default",
                "{controller}/{action}",
                new { controller = "Home", action = "Index" }
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
