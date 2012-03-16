using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using Kendo.Models;
using IOFile = System.IO.File;

namespace Kendo.Controllers
{
    public class SuiteController : BaseController
    {
        protected static readonly IDictionary<String, String> Docs =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { "mobile.application", "mobile.application" },
                { "web.datasource", "data.datasource" },
                { "web.templates", "template" }
            };

        private List<string> examplesUrl = new List<string>();

        //
        // GET: /Web/
        public ActionResult Index(string suite, string section, string example)
        {
            ViewBag.ShowCodeStrip = true;
            ViewBag.Suite = suite;
            ViewBag.Section = section;
            ViewBag.Example = example;
            ViewBag.Description = LoadDescription(suite, section);
            ViewBag.ConfigurationDocPath = DocPath(suite, section, "configuration");
            ViewBag.MethodsDocPath = DocPath(suite, section, "methods");
            ViewBag.EventsDocPath = DocPath(suite, section, "events");
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

            return View(
                string.Format("~/Views/{0}/{1}/{2}.cshtml", suite, section, example)
            );
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

        //
        // GET: /Web/
        public ActionResult Navigation(string suite, string section, string example)
        {
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            LoadNavigation(suite);

            FindCurrentExample();
            FindSiblingExamples();
            FindEdgeExamples();

            return PartialView("~/Views/Shared/Navigation.cshtml");
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

                        if (!found && Request.Path.EndsWith(example.Url))
                        {
                            ViewBag.CurrentWidget = widget;
                            ViewBag.CurrentExample = example;
                            ViewBag.Title = example.Text;

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
            var path = DocPath(suite, section, "description");
            var description = "";

            if (path != null) {
                description = IOFile.ReadAllText(Server.MapPath(path));
            }

            return description;
        }

        private string DocPath(string suite, string section, string topic)
        {
            var component = section;
            var docKey = String.Format("{0}.{1}", suite, section);

            if(Docs.ContainsKey(docKey)) {
               component = Docs[docKey];
            } else {
                switch(suite) {
                    case "dataviz":
                        component = "dataviz.ui." + (section.Contains("gauge") ? "gauge" : "chart");
                        break;
                    case "mobile":
                        component = "mobile.ui." + component;
                        break;
                    case "web":
                        component = "ui." + component;
                        break;
                }
            }

            var path = string.Format(
                "~/content/docs/kendo.{0}.{1}.html", component, topic
            );

            if (IOFile.Exists(Server.MapPath(path)))
            {
                return path;
            }
            else
            {
                return null;
            }
        }
    }
}
