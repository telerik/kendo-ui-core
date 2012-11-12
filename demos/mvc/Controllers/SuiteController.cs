using Kendo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using IOFile = System.IO.File;
using System.IO;

namespace Kendo.Controllers
{
    public class SuiteController : BaseController
    {
        private List<string> examplesUrl = new List<string>();
        protected static readonly string docsURL = "http://docs.kendoui.com/api/{0}/{1}";

        protected static readonly IDictionary<String, String> Docs =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { "datasource", "framework" },
                { "templates", "framework" },
                { "mvvm", "framework" },
                { "drag", "framework" },
                { "validator", "framework" }
            };

        //
        // GET: /Web/
        public ActionResult Index(string suite, string section, string example, bool? nav)
        {
            ViewBag.ShowCodeStrip = true;
            ViewBag.Suite = suite;
            ViewBag.Section = section;
            ViewBag.Example = example;
            ViewBag.Frameworks = Frameworks(suite, section, example);
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            LoadNavigation(suite);

            FindCurrentExample();
            FindSiblingExamples();
            FindEdgeExamples();

            if (suite == "mobile") {
                ViewBag.scripts = Kendo.Models.ScriptGroups.Mobile;
                ViewBag.styles = Kendo.Models.StyleGroups.Mobile;
            } else {
                ViewBag.scripts = Kendo.Models.ScriptGroups.All;
                ViewBag.styles = Kendo.Models.StyleGroups.All;
            }

            ViewBag.Documentation = ViewBag.CurrentExample.Documentation ?? ViewBag.CurrentWidget.Documentation;

            return View(
                string.Format("~/Views/{0}/{1}/{2}.cshtml", suite, section, example)
            );
        }

        private class FrameworkDescription
        {
            public string Name { get; set; }

            public String[] Patterns { get; set; }
        }

        private static IDictionary<String, FrameworkDescription> frameworkConfiguration = new Dictionary<String, FrameworkDescription>
        {
            { "aspnetmvc", new FrameworkDescription { Name = "ASP.NET MVC", Patterns = new[] {"~/src/{0}/aspx/{1}/{2}/{3}.aspx", "~/src/{0}/razor/{1}/{2}/{3}.cshtml" } } }
        };

        private IEnumerable<ExampleFramework> Frameworks(string suite, string section, string example)
        {
            var frameworks = new List<ExampleFramework>();

            frameworks.Add(new ExampleFramework
            {
                Name = "HTML",
                Files = new [] {
                    new ExampleFile
                    {
                        Name = example + ".html",
                        Url = string.Format("~/Views/{0}/{1}/{2}.cshtml", suite, section, example)
                    }
                }
            });

            foreach (var description in frameworkConfiguration)
            {
                var framework = description.Key;
                var patterns = description.Value.Patterns;

                var files = patterns
                             .Select(pattern => new ExampleFile
                             {
                                 Name = example + Path.GetExtension(pattern),
                                 Url = String.Format(pattern, framework, suite, section, example)
                             })
                             .Where(file => file.Exists(Server));

                if (files.Any())
                {
                    frameworks.Add(new ExampleFramework
                    {
                        Name = description.Value.Name,
                        Files = files
                    });
                }
            }

            return frameworks;
        }

        public ActionResult SectionIndex(string suite, string section)
        {
            var isMobileDevice = Regex.IsMatch(Request.UserAgent, "(blackberry|playbook|meego;\\s*nokia|android|silk|iphone|ipad|ipod)", RegexOptions.IgnoreCase);
            var redirect = RedirectPermanent(Url.Action("Index", new { suite = suite, section = section, example = "index" }));

            if (suite == "mobile" && isMobileDevice)
            {
                redirect = RedirectPermanent(Url.RouteUrl("MobileDeviceIndex"));
            }

            return redirect;
        }

        protected void FindCurrentExample()
        {
           var found = false;

            foreach (string category in ViewBag.Navigation.Keys)
            {
                foreach (NavigationWidget widget in ViewBag.Navigation[category])
                {
                    foreach (NavigationExample example in widget.Items)
                    {
                        if (!example.Url.Contains("overview")) {
                            examplesUrl.Add(string.Format("~/{0}/{1}", ViewBag.Suite, example.Url));
                        }

                        if (!found && (Request.Path.EndsWith("/" + example.Url) || (ViewBag.Example == "result" && example.Url == "upload/index.html")))
                        {
                            ViewBag.CurrentWidget = widget;
                            ViewBag.CurrentExample = example;
                            ViewBag.Title = example.Title ?? example.Text;
                            ViewBag.Meta = example.Meta;
                            ViewBag.Description = example.Description;

                            found = true;
                        }
                    }
                }
            }
        }

        protected void FindSiblingExamples()
        {
            if (ViewBag.CurrentExample != null)
            {
                var url = string.Format("~/{0}/{1}", ViewBag.Suite, ViewBag.CurrentExample.Url);
                var index = examplesUrl.IndexOf(url);

                if (index > 0)
                {
                    ViewBag.PrevUrl = examplesUrl[index - 1];
                }

                if (index < examplesUrl.Count - 1)
                {
                    ViewBag.NextUrl = examplesUrl[index + 1];
                }
            }
        }

        protected void FindEdgeExamples()
        {
            if (ViewBag.CurrentWidget != null)
            {
                var index = -1;
                var items = ViewBag.CurrentWidget.Items;
                var first = string.Format("~/{0}/{1}", ViewBag.Suite, items[0].Url);
                var last = string.Format("~/{0}/{1}", ViewBag.Suite, items[items.Length - 1].Url);

                index = examplesUrl.IndexOf(first);
                if (index > 0) {
                    ViewBag.PrevWidgetUrl = examplesUrl[index - 1];
                }

                index = examplesUrl.IndexOf(last);
                if (index < examplesUrl.Count - 1) {
                    ViewBag.NextWidgetUrl = examplesUrl[index + 1];
                }
            }
        }

        protected string LoadDescription(string suite, string section) {
            var content = LoadDocPage(suite, section);
            var description = string.Empty;

            if (!string.IsNullOrEmpty(content)) {
                description = GetTopic(content, "description");
            }

            return description;
        }

        private string LoadDocPage(string suite, string section)
        {
            section = section.Replace("-", "").ToLower();

            if (section.IndexOf("chart") > -1)
            {
                section = "chart";
            }

            if (section.IndexOf("drag") > -1)
            {
                section = "drag";
            }

            if (Docs.ContainsKey(section))
            {
                suite = Docs[section];
            }

            WebClient client = new WebClient();
            return client.DownloadString(string.Format(docsURL, suite, section));
        }

        private string GetTopic(string html, string topic) {
            var splits = html.Split(new string[] { "<h2" }, System.StringSplitOptions.None).ToList();
            var content = string.Empty;

            if (splits.Count > 0)
            {
                content = splits.Where(split => split.IndexOf(topic, StringComparison.OrdinalIgnoreCase) > -1).FirstOrDefault();

                if (!string.IsNullOrEmpty(content))
                {
                    splits = content.Split('\n').ToList();
                    splits.RemoveAt(0);

                    content = string.Join("", splits);
                }
            }

            return content;
        }
    }
}
