// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

using System;
using System.Web.Routing;

namespace Telerik.Web.Mvc.Extensions
{
    public static class RouteValueDictionaryExtensions
    {
        private static void GetActionParams(RouteValueDictionary routeValues, out object actionName, out object controllerName, RouteValueDictionary values)
        {
            routeValues.TryGetValue("action", out actionName);
            routeValues.TryGetValue("controller", out controllerName);
            
            routeValues.Remove("action");
            routeValues.Remove("controller");

            values.Merge(routeValues);
        }

        public static void ApplyTo(this RouteValueDictionary routeValues, INavigatable instance, Action<INavigatable, string, string, RouteValueDictionary> callBack)
        {
            object actionName;
            object controllerName;
            RouteValueDictionary values = new RouteValueDictionary();

            GetActionParams(routeValues, out actionName, out controllerName, values);

            callBack(instance, (string)actionName, (string)controllerName, values);
        }

        public static TBuilder ApplyTo<TBuilder>(this RouteValueDictionary routeValues, Func<string, string, RouteValueDictionary, TBuilder> callBack)
        {
            object actionName;
            object controllerName;
            RouteValueDictionary values = new RouteValueDictionary();

            GetActionParams(routeValues, out actionName, out controllerName, values);

            return callBack((string)actionName, (string)controllerName, values);
        }
    }
}
