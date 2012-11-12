using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IOFile = System.IO.File;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Kendo.Controllers
{
    public class SourceController : BaseController
    {
        private static readonly string fileNamePattern = "{0}.{1}";
        private static readonly string sourceUrlPattern = "~/sources/{0}/{1}/{2}/{3}";
        private static readonly IDictionary<String, String> availableSources =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { "aspx", "aspx" },
                { "razor", "cshtml" }
            };

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

        public ActionResult _Index(string suite, string section, string example, string area)
        {
            var source = string.Empty;
            if (string.IsNullOrEmpty(area)) {
                source = RenderView(
                    suite,
                    string.Format("~/Views/{0}/{1}/{2}.cshtml", suite, section, example),
                    "SourceLayout"
                );
            }
            else if (availableSources.ContainsKey(area))
            {
                var url = GenerateUrl(area, suite, section, example, availableSources[area]);
                if (IOFile.Exists(Server.MapPath(url)))
                {
                    source = DecodeContent(IOFile.ReadAllText(Server.MapPath(url)));
                }
            }

            return Content(source, "text/plain");
        }

        public PartialViewResult SourceView(string suite, string section, string example)
        {
            ViewBag.Sources = GenerateSourceItems(suite, section, example);
            return PartialView("SourceView");
        }

        private string RenderView(string suite, string viewName, string template)
        {
            using (var writer = new StringWriter())
            {
                ViewData["suite"] = suite;
                var viewResult = ViewEngines.Engines.FindView(ControllerContext, viewName, template);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, writer);
                viewResult.View.Render(viewContext, writer);

                return DecodeContent(writer.GetStringBuilder().ToString());
            }
        }

        private string DecodeContent(string source)
        {
            return "<pre id='code' class='codeContainer prettyprint'>" + HttpUtility.HtmlEncode(source) + "</pre>";
        }

        private List<SelectListItem> GenerateSourceItems(string suite, string section, string example)
        {
            var list = new List<SelectListItem>
            {
                new SelectListItem
                {
                    Text = example + ".html",
                    Value = Url.RouteUrl("Source", new { suite = suite, section = section, example = example })
                }
            };

            foreach (var pair in availableSources)
            {
                var url = GenerateUrl(pair.Key, suite, section, example, pair.Value);
                if (IOFile.Exists(Server.MapPath(url)))
                {
                    list.Add(new SelectListItem
                    {
                        Text = string.Format(fileNamePattern, example, pair.Value),
                        Value = Url.RouteUrl("Source", new { suite = suite, section = section, example = example, area = pair.Key })
                    });
                }
            }

            return list;
        }

        private string GenerateUrl(string area, string suite, string section, string example, string extension)
        {
            var name = string.Format(fileNamePattern, example.Replace("-", "_"), extension);
            return string.Format(sourceUrlPattern, area, suite, section.Replace("-", "_"), name);
        }
    }
}
