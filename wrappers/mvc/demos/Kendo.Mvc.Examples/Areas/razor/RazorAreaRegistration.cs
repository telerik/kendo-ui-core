using System.Web.Mvc;
using System.Web.Routing;

namespace Kendo.Mvc.Examples.Areas.Razor
{
    public class RazorAreaRegistration : AreaRegistration
    {
        public const string RazorViewToken = "IsRazorView";

        public override string AreaName
        {
            get
            {
                return "razor";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            var razorRoute = new Route(
                "razor/{suite}/{controller}/{action}",
                new RouteValueDictionary { { "controller", "Suite" }, { "action", "Index" } },
                new RouteValueDictionary(),
                // The 'UseNamespaceFallback' token will allow the runtime to use the controllers defined outside the area
                new RouteValueDictionary { { "UseNamespaceFallback", true }, { RazorViewToken, true }, { "area", AreaName } },
                new HyphenatedRouteHandler()
            );

            context.Routes.Add("RazorDefault", razorRoute);
        }
    }
}
