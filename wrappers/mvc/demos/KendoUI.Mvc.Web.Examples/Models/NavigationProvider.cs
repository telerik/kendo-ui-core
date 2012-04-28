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

        public static IDictionary<string, NavigationWidget[]> SuiteWidgets()
        {
            var navigationJson = IOFile.ReadAllText(
                HttpContext.Current.Server.MapPath(
                    string.Format(Config.NavigationData)
                )
            );

            return Serializer.Deserialize<IDictionary<string, NavigationWidget[]>>(navigationJson);
        }
    }
}