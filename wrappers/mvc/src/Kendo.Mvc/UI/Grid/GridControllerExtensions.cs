namespace Kendo.Mvc.Extensions
{
    using System;
    using System.Globalization;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Kendo.Mvc.UI;
    using System.Collections.Generic;
    using System.Web;    
    using System.Web.Helpers;    

    public static class GridControllerExtensions
    {
        public static RouteValueDictionary GridRouteValues(this ControllerBase controller)
        {            
            var routeValues = new RouteValueDictionary();

            var values = GetParams(controller.ControllerContext.HttpContext.Request);            

            foreach (string key in values.Keys)
            {
                if (key.EndsWith(GridUrlParameters.Page, StringComparison.OrdinalIgnoreCase) ||
                    key.EndsWith(GridUrlParameters.Filter, StringComparison.OrdinalIgnoreCase) ||
                    key.EndsWith(GridUrlParameters.Sort, StringComparison.OrdinalIgnoreCase) ||
                    key.EndsWith(GridUrlParameters.Group, StringComparison.OrdinalIgnoreCase) ||
                    key.EndsWith(GridUrlParameters.PageSize, StringComparison.OrdinalIgnoreCase))
                {
                    routeValues[key] = values[key];
                }
            }

            return routeValues;
        }        

        private static IDictionary<string, object> GetParams(HttpRequestBase request)
        {
            var result = new Dictionary<string, object>();
            var unvalidated = request.Unvalidated();
            unvalidated.Form.CopyTo(result);
            unvalidated.QueryString.CopyTo(result);
            return result;
        }

        public static T ValueOf<T>(this ControllerBase controller, string key)
        {
            ValueProviderResult result;
            bool found = true;
            result = controller.ValueProvider.GetValue(key);
            found = result != null;
            if (found)
            {
                return (T)result.ConvertTo(typeof(T), CultureInfo.CurrentCulture);
            }

            return default(T);
        }
    }
}
