using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples
{
    public class KendoWebFormViewEngine : WebFormViewEngine
    {
        public KendoWebFormViewEngine()
        {
             AreaViewLocationFormats = new[]
             {
                "~/Areas/{2}/Views/{1}/{0}.aspx",
                "~/Areas/{2}/Views/Shared/{0}.aspx"
            };

             AreaMasterLocationFormats = new[] {
                "~/Areas/{2}/Views/{1}/{0}.master",
                "~/Areas/{2}/Views/Shared/{0}.master",
            };

             AreaPartialViewLocationFormats = new[] {
                "~/Areas/{2}/Views/{1}/{0}.ascx",
                "~/Areas/{2}/Views/Shared/{0}.ascx",
            };
        }
    }
}