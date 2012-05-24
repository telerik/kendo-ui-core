using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples
{
    public class HyphenatedRouteHandler : MvcRouteHandler
    {
        protected override IHttpHandler GetHttpHandler(System.Web.Routing.RequestContext requestContext)
        {
            requestContext.RouteData.Values["controller"] = 
                requestContext.RouteData.Values["controller"].ToString().Replace("-", "_");

            requestContext.RouteData.Values["action"] =
                requestContext.RouteData.Values["action"].ToString().Replace("-", "_");

            return base.GetHttpHandler(requestContext);
        }
    }
}