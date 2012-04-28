using System.Web.Mvc;

namespace KendoUI.Mvc.Web.Examples.Areas.Razor
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
            var exampleRoute = context.MapRoute(
                "RazorExample",
                "razor/{controller}/{action}.html"
            );

            // The 'UseNamespaceFallback' token will allow the runtime to use the controllers defined outside the area
            exampleRoute.DataTokens["UseNamespaceFallback"] = true;
            exampleRoute.DataTokens[RazorViewToken] = true;

            var razorRoute = context.MapRoute(
                "RazorDefault",
                "razor/{controller}/{action}",
                new { controller = "Suite", action = "Index" }
            );

            // The 'UseNamespaceFallback' token will allow the runtime to use the controllers defined outside the area
            razorRoute.DataTokens["UseNamespaceFallback"] = true;
            razorRoute.DataTokens[RazorViewToken] = true;
        }
    }
}
