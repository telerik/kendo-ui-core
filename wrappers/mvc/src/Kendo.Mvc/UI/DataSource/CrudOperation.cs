using System.Collections.Generic;
using System.Web.Routing;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;

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
            Data = new ClientEvent();
        }

        //private string Encode(string value)
        //{
        //    if (grid.IsSelfInitialized)
        //    {
        //        value = Regex.Replace(value, "(%20)*%3C%23%3D(%20)*", "<#=", RegexOptions.IgnoreCase);
        //        value = Regex.Replace(value, "(%20)*%23%3E(%20)*", "#>", RegexOptions.IgnoreCase);
        //    }

        //    return value;
        //}

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Url != null)
            {
                json["url"] = Url;

                if (DataType.HasValue())
                {
                    json["dataType"] = DataType;
                }

                if (Data.HasValue())
                {
                    json["data"] = Data;
                }

                if (Type.HasValue())
                {
                    json["type"] = Type;
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

        public ClientEvent Data { get; set; }

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

        public string Type
        {
            get;
            set;
        }
    }
}