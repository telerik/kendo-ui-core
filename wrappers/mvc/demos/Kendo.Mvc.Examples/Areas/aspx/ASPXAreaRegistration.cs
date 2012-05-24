using System.Web.Mvc;
using System.Web.Routing;

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
            var aspxRoute = new Route(
                "aspx/{suite}/{controller}/{action}",
                new RouteValueDictionary { { "controller", "Suite" }, { "action", "Index" } },
                new RouteValueDictionary(),
                // The 'UseNamespaceFallback' token will allow the runtime to use the controllers defined outside the area
                new RouteValueDictionary { { "UseNamespaceFallback", true }, { "area", AreaName } },
                new HyphenatedRouteHandler()
            );

            context.Routes.Add("ASPXDefault", aspxRoute);
        }
    }
}
