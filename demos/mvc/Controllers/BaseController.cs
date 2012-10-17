using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Kendo.Models;
using IOFile = System.IO.File;

namespace Kendo.Controllers
{
    public abstract class BaseController : Controller
    {
        private static readonly JavaScriptSerializer Serializer = new JavaScriptSerializer();

        protected static readonly IDictionary<String, String> MimeTypes =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { ".js", "application/x-javascript" },
                { ".json", "application/json" },
                { ".css", "text/css" },
                { ".less", "text/css" },
                { ".jpg", "image/jpg" },
                { ".gif", "image/gif" },
                { ".png", "image/png" },
                { ".svg", "image/svg+xml" },
                { ".eot", "application/vnd.ms-fontobject" },
                { ".ttf", "application/octet-stream" },
                { ".woff", "application/octet-stream" }
            };

        protected static readonly IDictionary<String, String> AssetRoots =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { "js", "src" },
                { "styles", "styles" }
            };

        public ActionResult StaticContent(string path)
        {
            var mimeType = MimeTypes[Path.GetExtension(path)];

            if (mimeType == null)
            {
                throw new HttpException(403, "Forbidden");
            }

            if (!IOFile.Exists(path))
            {
                throw new HttpException(404, "File Not Found");
            }

            return File(IOFile.ReadAllBytes(path), mimeType);
        }

        protected void LoadNavigation(string suite)
        {
            var navigationJson = IOFile.ReadAllText(
                Server.MapPath(
                    string.Format("~/App_Data/{0}.nav.json", suite)
                )
            );

            ViewBag.Navigation = Serializer.Deserialize<IDictionary<string, NavigationWidget[]>>(navigationJson);
        }
    }
}
