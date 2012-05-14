using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Areas.ASPX
{
    public class ASPXAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "aspx";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            var aspxRoute = context.MapRoute(
                "ASPXDefault",
                "aspx/{suite}/{controller}/{action}",
                new { controller = "Suite", action = "Index" }
            );

            // The 'UseNamespaceFallback' token will allow the runtime to use the controllers defined outside the area
            aspxRoute.DataTokens["UseNamespaceFallback"] = true;
        }
    }
}
