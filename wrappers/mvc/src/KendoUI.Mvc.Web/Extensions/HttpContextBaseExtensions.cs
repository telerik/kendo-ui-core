// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
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

        /// <summary>
        /// Gets a value indicating whether we're running under Mono.
        /// </summary>
        /// <value><c>true</c> if Mono; otherwise, <c>false</c>.</value>
        public static bool IsMono(this HttpContextBase instance)
        {
            return Type.GetType("Mono.Runtime") != null;
        }

        /// <summary>
        /// Gets a value indicating whether we're running under Linux or a Unix variant.
        /// </summary>
        /// <value><c>true</c> if Linux/Unix; otherwise, <c>false</c>.</value>
        public static bool IsLinux(this HttpContextBase instance)
        {
            int p = (int)Environment.OSVersion.Platform;
            return ((p == 4) || (p == 128));
        }
    }
}