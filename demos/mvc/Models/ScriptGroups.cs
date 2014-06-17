using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Kendo.Models
{
    public static class ScriptGroups
    {
        static ScriptGroups() {
#if DEBUG
            All = System.IO.File.ReadAllLines(HttpContext.Current.Server.MapPath("~/content/all-scripts.txt"));
#endif
        }

        private static readonly string jQueryPath = string.Format(
            "http://code.jquery.com/jquery-{0}.min.js",
            ConfigurationManager.AppSettings["JQUERY_VERSION"]
        );

        private static readonly string AngularPath = string.Format(
            "http://ajax.googleapis.com/ajax/libs/angularjs/{0}/angular.js",
            ConfigurationManager.AppSettings["ANGULAR_VERSION"]
        );


        public static IList<string> All = new string[]
        {
            jQueryPath,
            AngularPath,
            "kendo.all.min.js",
            "kendo.timezones.min.js"
        };
    }
}
