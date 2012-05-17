using System.Collections.Generic;
using Kendo.Mvc.Extensions;
using System.Web.Routing;
using Kendo.Mvc.Infrastructure;
using System.Web.Mvc;

namespace Kendo.Mvc.UI
{
    public class CrudOperation : JsonObject, INavigatable
    {
        private string routeName;
        private string controllerName;
        private string actionName;        

        public CrudOperation()
        {            
            RouteValues = new RouteValueDictionary();
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Url.HasValue())
            {
                json["url"] = Url;

                if (DataType.HasValue())
                {
                    json["dataType"] = DataType;
                }
            }
        }        

        public string DataType { get; set; }               

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