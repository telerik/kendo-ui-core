using System.Web.Mvc;

namespace KendoUI.Mvc.Web.Examples.Areas.ASPX
{
    public class ASPXAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "ASPX";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            var aspxRoute = context.MapRoute(
                "ASPXDefault",
                "aspx/{controller}/{action}",
                new { controller = "Suite", action = "Index" }
            );

            // The 'UseNamespaceFallback' token will allow the runtime to use the controllers defined outside the area
            aspxRoute.DataTokens["UseNamespaceFallback"] = true;
        }
    }
}
