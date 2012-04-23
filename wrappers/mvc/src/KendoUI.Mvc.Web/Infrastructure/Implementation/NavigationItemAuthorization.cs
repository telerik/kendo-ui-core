// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Web.Routing;
    using Infrastructure;

    public class NavigationItemAuthorization : INavigationItemAuthorization
    {
        private readonly IControllerAuthorization controllerAuthorization;
        private readonly IUrlAuthorization urlAuthorization;

        public NavigationItemAuthorization(IControllerAuthorization controllerAuthorization, IUrlAuthorization urlAuthorization)
        {
            Guard.IsNotNull(controllerAuthorization, "controllerAuthorization");
            Guard.IsNotNull(urlAuthorization, "urlAuthorization");

            this.controllerAuthorization = controllerAuthorization;
            this.urlAuthorization = urlAuthorization;
        }

        public bool IsAccessibleToUser(RequestContext requestContext, INavigatable navigationItem)
        {
            Guard.IsNotNull(requestContext, "requestContext");
            Guard.IsNotNull(navigationItem, "navigationItem");

            bool isAllowed = true;

            if (!string.IsNullOrEmpty(navigationItem.RouteName))
            {
                isAllowed = controllerAuthorization.IsAccessibleToUser(requestContext, navigationItem.RouteName);
            }
            else if (!string.IsNullOrEmpty(navigationItem.ControllerName) && !string.IsNullOrEmpty(navigationItem.ActionName))
            {
                isAllowed = controllerAuthorization.IsAccessibleToUser(requestContext, navigationItem.ControllerName, navigationItem.ActionName, navigationItem.RouteValues);
            }

            return isAllowed;
        }
    }
}