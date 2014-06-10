using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Routing;

namespace Kendo.Mvc.UI
{
    public class EditorFileBrowserOperation : JsonObject, INavigatable
    {
        private string routeName;
        private string controllerName;
        private string actionName;

        public EditorFileBrowserOperation()
        {            
            RouteValues = new RouteValueDictionary();            
        }

        private string Encode(string value)
        {            
            value = Regex.Replace(value, "(%20)*%23%3D(%20)*", "#=", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%23(%20)*", "#", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%24%7B(%20)*", "${", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%7D(%20)*", "}", RegexOptions.IgnoreCase);

            return value;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Url != null)
            {
                json["url"] = Encode(Url);                               
            }
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
