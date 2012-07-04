using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IOFile = System.IO.File;
using System.Collections.Generic;

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

        //
        // GET: /suite/section/example.src.html
        // GET: /sources/{aspx|razor}/suite/section/example

        public ActionResult Index(string suite, string section, string example, string area)
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
