using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IOFile = System.IO.File;
using System.Text.RegularExpressions;

namespace Kendo.Controllers
{
    public class SourceController : BaseController
    {
        public ActionResult Index(string path)
        {
            if (String.IsNullOrEmpty(path) || (!path.StartsWith("~/Views") && !path.StartsWith("~/src")))
            {
                return HttpNotFound();
            }

            var mappedPath = Server.MapPath(path);

            if (!IOFile.Exists(mappedPath))
            {
                return HttpNotFound();
            }

            var source = String.Empty;

            if (path.StartsWith("~/Views"))
            {
                source = RenderView(path);
            }
            else
            {
                source = IOFile.ReadAllText(mappedPath);
            }

            return Content("<pre class='prettyprint'>" + HttpUtility.HtmlEncode(source) + "</pre>", "text/plain");
        }

        private string RenderView(string path)
        {
            string suite = Regex.Match(path, @"~/Views/([^/]*)/").Groups[1].Value;

            ViewData["suite"] = suite;

            var viewResult = ViewEngines.Engines.FindView(ControllerContext, path, "SourceLayout");

            using (var writer = new StringWriter())
            {
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, writer);

                viewResult.View.Render(viewContext, writer);

                return writer.GetStringBuilder().ToString();
            }
        }
    }
}
