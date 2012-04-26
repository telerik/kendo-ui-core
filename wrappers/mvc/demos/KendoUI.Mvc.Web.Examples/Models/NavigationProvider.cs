using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using IOFile = System.IO.File;

namespace KendoUI.Mvc.Web.Examples.Models
{
    public static class NavigationProvider
    {
        private static readonly JavaScriptSerializer Serializer = new JavaScriptSerializer();
        
        public static IEnumerable<string> SuiteNames()
        {
            return new string[] {
                "Web",
                "DataViz"
            };
        }

        public static IDictionary<string, NavigationWidget[]> SuiteWidgets(string suite)
        {
            var navigationJson = IOFile.ReadAllText(
                HttpContext.Current.Server.MapPath(
                    string.Format("~/App_Data/{0}.nav.json", suite.ToLowerInvariant())
                )
            );

            return Serializer.Deserialize<IDictionary<string, NavigationWidget[]>>(navigationJson);
        }
    }
}