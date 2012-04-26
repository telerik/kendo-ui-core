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
                return "Razor";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            var razorRoute = context.MapRoute(
                "RazorDefault",
                "razor/{controller}/{action}",
                new { controller = "Home", action = "BundleIndex" }
            );

            // The 'UseNamespaceFallback' token will allow the runtime to use the controllers defined outside the area
            razorRoute.DataTokens["UseNamespaceFallback"] = true;

            razorRoute.DataTokens[RazorViewToken] = true;
        }
    }
}
