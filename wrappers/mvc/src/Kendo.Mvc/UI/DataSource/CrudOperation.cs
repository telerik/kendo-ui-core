using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Routing;
using Kendo.Mvc.Extensions;

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
            Data = new ClientHandlerDescriptor();
            Cache = true;
        }

        private string Encode(string value)
        {            
            value = Regex.Replace(value, "(%20)*%23%3D(%20)*", "#=", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%23(%20)*", "#", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%24%7B(%20)*", "${", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%7D(%20)*", "}", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%7B0(%20)*", "{0", RegexOptions.IgnoreCase);

            return value;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Url != null)
            {
                json["url"] = Encode(Url);

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

                if (!string.IsNullOrEmpty(ContentType))
                {
                    json["contentType"] = ContentType;
                }

                if (!Cache)
                {
                    json["cache"] = Cache;
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

        public ClientHandlerDescriptor Data { get; set; }

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

        public string Type
        {
            get;
            set;
        }

        public string ContentType { get; set; }
        public bool Cache { get; set; }
    }
}