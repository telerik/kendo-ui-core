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
        private List<string> examplesUrl = new List<string>();
        protected static readonly docsURL = "http://docs.kendoui.com/api/{0}/{1}";

        //
        // GET: /Web/
        public ActionResult Index(string suite, string section, string example, bool? nav)
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

            ViewBag.Documentation = ViewBag.CurrentExample.Documentation ?? ViewBag.CurrentWidget.Documentation;

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
            var content = LoadDocPage(suite, section);
            var description = string.Empty;

            if (!string.IsNullOrEmpty(content)) {
                description = GetTopic(content, "description");
            }

            return description;
        }

        private string LoadDocPage(string suite, string section)
        {
            WebClient client = new WebClient();
            return client.DownloadString(string.Format(docsURL, suite, section));
        }

        private string GetTopic(string html, string topic) {
            var splits = html.Split(new string[] { "<h2 class=\"toc\"" }, System.StringSplitOptions.None).ToList();
            var content = string.Empty;

            if (splits.Count > 0)
            {
                if (splits[0].IndexOf("doctype", StringComparison.OrdinalIgnoreCase) > -1)
                {
                    splits.RemoveAt(0);
                }

                if (splits[0].IndexOf("contents", StringComparison.OrdinalIgnoreCase) > -1)
                {
                    splits.RemoveAt(0);
                }

                if (splits[0].IndexOf(topic, StringComparison.OrdinalIgnoreCase) > -1)
                {
                    content = splits[0].Split('\n');
                }
            }

            return content;
        }
    }
}
