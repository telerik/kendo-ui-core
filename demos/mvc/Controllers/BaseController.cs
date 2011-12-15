using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IOFile = System.IO.File;

namespace Kendo.Controllers
{
    public abstract class BaseController : Controller
    {
        protected static readonly IDictionary<String, String> MimeTypes =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { ".js", "application/x-javascript" },
                { ".json", "application/json" },
                { ".css", "text/css" },
                { ".jpg", "image/jpg" },
                { ".gif", "image/gif" },
                { ".png", "image/png" }
            };

        protected static readonly IDictionary<String, String> AssetRoots =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { "src/js", "src" },
                { "src/styles", "styles" },
                { "shared/js", "demos/examples/shared/js" },
                { "shared/styles", "demos/examples/shared/styles" }
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
    }
}
