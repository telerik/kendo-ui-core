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

        public static IEnumerable<NavigationWidget> SuiteWidgets()
        {
            var navigationJson = IOFile.ReadAllText(HttpContext.Current.Server.MapPath("~/Content/nav.json"));
            return Serializer.Deserialize<IEnumerable<NavigationWidget>>(navigationJson);
        }
    }
}