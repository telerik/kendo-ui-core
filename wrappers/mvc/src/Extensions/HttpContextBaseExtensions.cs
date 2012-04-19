namespace KendoUI.Mvc.Extensions
{
    using System;
    using System.Web;
    using System.Web.Routing;

    /// <summary>
    /// Contains extension methods of <see cref="HttpContextBase"/>.
    /// </summary>
    public static class HttpContextBaseExtensions
    {
        /// <summary>
        /// Requests the context.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <returns></returns>
        public static RequestContext RequestContext(this HttpContextBase instance)
        {
            RouteData routeData = RouteTable.Routes.GetRouteData(instance) ?? new RouteData();
            RequestContext requestContext = new RequestContext(instance, routeData);

            return requestContext;
        }
    }
}