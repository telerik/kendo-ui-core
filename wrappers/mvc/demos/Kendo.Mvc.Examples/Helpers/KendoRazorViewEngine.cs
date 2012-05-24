using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples
{
    public class KendoRazorViewEngine : RazorViewEngine
    {
        public KendoRazorViewEngine()
        {
             AreaViewLocationFormats = new[]
             {
                "~/Areas/{2}/Views/%suite/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/%suite/Shared/{0}.cshtml"
            };

             AreaMasterLocationFormats = new[] {
                "~/Areas/{2}/Views/%suite/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/%suite/Shared/{0}.cshtml",
            };

             AreaPartialViewLocationFormats = new[] {
                "~/Areas/{2}/Views/%suite/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/%suite/Shared/{0}.cshtml",
            };
        }

        protected override IView CreatePartialView(ControllerContext controllerContext, string partialPath)
        {
            return base.CreatePartialView(controllerContext, ResolveSuite(controllerContext, partialPath));
        }
        
        protected override IView CreateView(ControllerContext controllerContext, string viewPath, string cshtmlPath)
        {
            return base.CreateView(controllerContext, ResolveSuite(controllerContext, viewPath), ResolveSuite(controllerContext, cshtmlPath));
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