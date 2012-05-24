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
                "~/Areas/{2}/Views/%suite/{1}/{0}.aspx",
                "~/Areas/{2}/Views/%suite/Shared/{0}.aspx"
            };

             AreaMasterLocationFormats = new[] {
                "~/Areas/{2}/Views/%suite/{1}/{0}.master",
                "~/Areas/{2}/Views/%suite/Shared/{0}.master",
            };

             AreaPartialViewLocationFormats = new[] {
                "~/Areas/{2}/Views/%suite/{1}/{0}.ascx",
                "~/Areas/{2}/Views/%suite/Shared/{0}.ascx",
            };
        }

        protected override IView CreatePartialView(ControllerContext controllerContext, string partialPath)
        {
            return base.CreatePartialView(controllerContext, ResolveSuite(controllerContext, partialPath));
        }
        
        protected override IView CreateView(ControllerContext controllerContext, string viewPath, string masterPath)
        {
            return base.CreateView(controllerContext, ResolveSuite(controllerContext, viewPath), ResolveSuite(controllerContext, masterPath));
        }

        protected override bool FileExists(ControllerContext controllerContext, string virtualPath)
        {
            return base.FileExists(controllerContext, ResolveSuite(controllerContext, virtualPath));
        }

        private string ResolveSuite(ControllerContext controllerContext, string path)
        {
            var suite = controllerContext.RouteData.Values["suite"];
            return (suite != null) ? path.Replace("%suite", suite.ToString()) : path;
        }
    }
}