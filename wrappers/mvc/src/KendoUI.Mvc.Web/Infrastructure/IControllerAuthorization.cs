// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Web.Routing;

    public interface IControllerAuthorization
    {
        bool IsAccessibleToUser(RequestContext requestContext, string routeName);

        bool IsAccessibleToUser(RequestContext requestContext, string controllerName, string actionName);

        bool IsAccessibleToUser(RequestContext requestContext, string controllerName, string actionName, RouteValueDictionary routeValues);
    }
}