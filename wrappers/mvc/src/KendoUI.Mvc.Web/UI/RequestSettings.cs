// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web.Routing;
    using Telerik.Web.Mvc.Infrastructure;
    
    public class RequestSettings : INavigatable
    {
        private string routeName;
        private string controllerName;
        private string actionName;

        public RequestSettings()
        {
            RouteValues = new RouteValueDictionary();
        }

        public string ActionName
        {
            get
            {
                return actionName;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                actionName = value;

                routeName = null;
            }
        }

        public string ControllerName
        {
            get
            {
                return controllerName;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                controllerName = value;

                routeName = null;
            }
        }

        public RouteValueDictionary RouteValues
        {
            get;
            set;
        }

        public string RouteName
        {
            get
            {
                return routeName;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                routeName = value;
                controllerName = actionName = null;
            }
        }

        public string Url
        {
            get;
            set;
        }
    }
}
