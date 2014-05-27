using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace Kendo
{
    public class SpaViewEngine : RazorViewEngine
    {
        public SpaViewEngine()
        {
            var viewLocations =  new[] { "~/Views/web/spa/{0}.cshtml" };

            this.PartialViewLocationFormats = viewLocations;
            this.ViewLocationFormats = viewLocations;
        }
    }

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                "AsyncUpload",
                "upload/{action}",
                new { controller = "Upload" },
                new { action = "(save|remove|submit)" }
            );

            routes.MapRoute(
                "SourceView",
                "source/index",
                new { controller = "Source", action = "Index" }
            );

            routes.MapRoute(
                "Bootstrap",
                "bootstrap",
                new { controller = "Integration", action = "Bootstrap" }
            );

            routes.MapRoute(
                "html5-diagram-sample-app",
                "html5-diagram-sample-app",
                new { controller = "Integration", action = "Diagram" }
            );

            routes.MapRoute(
                "Sushi",
                "sushi",
                new { controller = "Integration", action = "Sushi" }
            );

            routes.MapRoute(
                "WebSushi",
                "websushi",
                new { controller = "Spa", action = "Sushi" }
            );

            routes.MapRoute(
                "Aeroviewr",
                "aeroviewr",
                new { controller = "Spa", action = "Aeroviewr" }
            );

            routes.MapRoute(
                "ThemeBuilder",
                "themebuilder",
                new { controller = "ThemeBuilder", action = "Index" }
            );

            routes.MapRoute(
                "MobileThemeBuilder",
                "mobilethemebuilder",
                new { controller = "ThemeBuilder", action = "MobileIndex" }
            );

            routes.MapRoute(
                "AeroviewrCallback",
                "aeroviewr/callback.html",
                new { controller = "Spa", action = "AeroviewrCallback" }
            );

            routes.MapRoute(
                "Simulator",
                "mobile/simulator",
                new { controller = "Integration", action = "Simulator" }
            );

            routes.MapRoute(
                "MobileDeviceIndex",
                "m/{action}",
                new { controller = "MobileDevice", action = "Index" }
            );

            routes.MapRoute(
                "MobileApplication",
                "mobile-apps/{app}",
                new { controller = "MobileApps", action = "Index" }
            );

            routes.MapRoute(
                "MobileApplicationInstance",
                "mobile-apps/{app}/contents",
                new { controller = "MobileApps", action = "App" }
            );

            routes.MapRoute(
                "MobileDeviceExample",
                "m/{section}/{example}",
                new { controller = "MobileDevice", action = "Example" }
            );

            routes.MapRoute(
                "Demo",
                "{section}/{example}",
                new { controller = "Demo", action = "Index", example = UrlParameter.Optional }
            );

            routes.MapRoute(
                "Debug",
                "src/{assetType}/{*file}",
                new { controller = "Debug", action = "Resource" },
                new { assetType = "(js|styles)" }
            );

            routes.MapRoute(
                "Root",
                "",
                new { controller = "Home", action = "Index" }
            );
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
            ViewEngines.Engines.Add(new SpaViewEngine());
        }
    }
}
