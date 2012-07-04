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

        private static readonly string fileName = "{0}.{1}";
        private static readonly string sourceUrl = "~/Areas/{0}/Views/{1}/{2}/{3}";
        private static readonly IDictionary<String, String> availableSources =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { "aspx", "aspx" },
                { "razor", "cshtml" }
            };

        //
        // GET: /suite/section/example.src.html

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
                var extension = availableSources[area];
                var name = string.Format(fileName, example.Replace("-", "_"), extension);
                var url = string.Format(sourceUrl, area, suite, section.Replace("-", "_"), name);

                if (IOFile.Exists(Server.MapPath(url)))
                {
                    var content = IOFile.ReadAllText(Server.MapPath(url));
                    source = "<pre id='code' class='codeContainer prettyprint'>" + HttpUtility.HtmlEncode(content) + "</pre>";

                }
            }

            return Content(source, "text/plain");
        }

        public PartialViewResult SourcesView(string suite, string section, string example)
        {
            ViewBag.Sources = GenerateSourceItems(suite, section, example);
            return PartialView("SourcesView");
        }

        private string RenderView(string suite, string viewName, string template)
        {
            using (var writer = new StringWriter())
            {
                ViewData["suite"] = suite;
                var viewResult = ViewEngines.Engines.FindView(ControllerContext, viewName, template);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, writer);
                viewResult.View.Render(viewContext, writer);

                return "<pre id='code' class='codeContainer prettyprint'>" + HttpUtility.HtmlEncode(writer.GetStringBuilder().ToString()) + "</pre>";
            }
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
                var name = string.Format(fileName, example.Replace("-", "_"), pair.Value);
                var url = string.Format(sourceUrl, pair.Key, suite, section.Replace("-", "_"), name);
                if (IOFile.Exists(Server.MapPath(url)))
                {
                    list.Add(new SelectListItem
                    {
                        Text = name,
                        //what routeURl should I use ???
                        Value = Url.RouteUrl("Source", new { suite = suite, section = section, example = example, area = pair.Key })
                    });
                }
            }

            return list;
        }
    }
}
