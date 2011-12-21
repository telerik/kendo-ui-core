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
                "Source",
                "{suite}/{section}/{example}.src.html",
                new { controller = "Suite", action = "Source" },
                suiteConstraint 
            );

            routes.MapRoute(
                "Suite",
                "{suite}/{section}/{example}.html",
                new { controller = "Suite", action = "Index", section = "overview", example = "index" },
                suiteConstraint
            );

            routes.MapRoute(
                "SectionIndex",
                "{suite}/{section}",
                new { controller = "Suite", action = "SectionIndex", section = "overview" },
                suiteConstraint
            );

            routes.MapRoute(
                "Static",
                "{assetGroup}/{assetType}/{*file}",
                new { controller = "Static", action = "Resource" },
                new { assetGroup = "(src)",
                      assetType = "(js|styles)" }
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
