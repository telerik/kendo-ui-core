namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Web.Routing;
    using Infrastructure;

    public class NavigationItemAuthorization : INavigationItemAuthorization
    {
        private readonly IControllerAuthorization controllerAuthorization;
        private readonly IUrlAuthorization urlAuthorization;

        public NavigationItemAuthorization(IControllerAuthorization controllerAuthorization, IUrlAuthorization urlAuthorization)
        {

            this.controllerAuthorization = controllerAuthorization;
            this.urlAuthorization = urlAuthorization;
        }

        public bool IsAccessibleToUser(RequestContext requestContext, INavigatable navigationItem)
        {

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