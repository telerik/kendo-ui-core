using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Kendo.Models;
using IOFile = System.IO.File;
using System.Text.RegularExpressions;

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

        public String CurrentProduct() {
            string product = "kendo-ui";

            // Mono/FastCGI Nginx support
            if (!string.IsNullOrEmpty(Request.ServerVariables["HTTP_X_KENDO"]))
            {
                product = Request.ServerVariables["HTTP_X_KENDO"];
            }

            if (!string.IsNullOrEmpty(Request.ServerVariables["X-KENDO"]))
            {
                product = Request.ServerVariables["X-KENDO"];
            }

            return product;
        }

        public string CurrentNavProduct()
        {
            return new Dictionary<string, string> {
                {"aspnet-mvc", "mvc"},
                {"kendo-ui", "online"},
                {"php-ui", "php"},
                {"jsp-ui", "jsp"}
            }[CurrentProduct()];
        }

        protected void LoadNavigation()
        {
            ViewBag.Navigation = LoadWidgets();
        }

        protected IEnumerable<NavigationWidget> LoadWidgets()
        {
            return Serializer.Deserialize<NavigationWidget[]>(IOFile.ReadAllText(Server.MapPath("~/content/nav.json")));
        }

        protected void LoadCategories()
        {
            ViewBag.Categories = LoadWidgets().GroupBy(w => w.Category).ToList();
        }

        protected bool IsMobileDevice()
        {
            return Regex.IsMatch(Request.UserAgent, "(blackberry|bb1\\w?;|playbook|meego;\\s*nokia|android|silk|iphone|ipad|ipod|windows phone|Mobile.*Firefox)", RegexOptions.IgnoreCase);
        }
    }
}
