using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using IOFile = System.IO.File;

namespace Kendo.Mvc.Examples.Models
{
    public static class NavigationProvider
    {
        private static readonly JavaScriptSerializer Serializer = new JavaScriptSerializer();

        public static IDictionary<string, NavigationWidget[]> SuiteWidgets(string suite)
        {
            var navigationJson = IOFile.ReadAllText(
                HttpContext.Current.Server.MapPath(
                    string.Format(Config.SuiteNavigationData(suite))
                )
            );

            return Serializer.Deserialize<IDictionary<string, NavigationWidget[]>>(navigationJson);
        }
    }
}