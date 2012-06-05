namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;

    public class CalendarSelectionSettings : INavigatable
    {
        private string routeName;
        private string controllerName;
        private string actionName;

        public CalendarSelectionSettings()
        {
            RouteValues = new RouteValueDictionary();
            Dates = new List<DateTime>();
        }

        public IList<DateTime> Dates
        { 
            get; 
            set; 
        }

        public string ActionName
        {
            get
            {
                return actionName;
            }
            set
            {

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
