using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using Kendo.Models;
using Kendo.Extensions;

namespace Kendo.Controllers
{
    public class SuiteController : BaseController
    {
        private List<string> examplesUrl = new List<string>();
        protected static readonly string docsURL = "http://docs.telerik.com/kendo-ui/api/{0}/{1}";

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
        public ActionResult Index(string section, string example, bool? nav)
        {
            var product = "kendo-ui";

            if (!string.IsNullOrEmpty(Request.ServerVariables["X-KENDO"]))
            {
                product = Request.ServerVariables["X-KENDO"];
            }

            ViewBag.ShowCodeStrip = true;
            ViewBag.Suite = product;
            ViewBag.Section = section;
            ViewBag.Example = example;
            ViewBag.Frameworks = Frameworks(product, section, example);
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            LoadNavigation();

            FindCurrentExample();
            FindSiblingExamples();
            FindEdgeExamples();

            if (product == "mobile") {
                ViewBag.scripts = Kendo.Models.ScriptGroups.Mobile;
                ViewBag.styles = Kendo.Models.StyleGroups.Mobile;

                if (ViewBag.CurrentExample.Url.StartsWith("adaptive") && IsMobileDevice())
                {
                    return Redirect(Url.RouteUrl("MobileDeviceIndex"));
                }
            } else {
                ViewBag.scripts = Kendo.Models.ScriptGroups.All;
                ViewBag.styles = Kendo.Models.StyleGroups.All;
            }

            ViewBag.Documentation = ViewBag.CurrentExample.Documentation ?? ViewBag.CurrentWidget.Documentation;

            return View(
                string.Format("~/Views/demos/{0}/{1}.cshtml", section, example)
            );
        }

        private static readonly IFrameworkDescription[] frameworkDescriptions = new IFrameworkDescription []
        {
            new AspNetMvcDescription(),
            new JspDescription(),
            new PhpDescription()
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

            foreach (var framework in frameworkDescriptions)
            {
                var files = framework.GetFiles(Server, example, section).Where(file => file.Exists(Server));

                if (files.Any())
                {
                    frameworks.Add(new ExampleFramework
                    {
                        Name = framework.Name,
                        Files = files
                    });
                }
            }

            return frameworks;
        }

        private bool IsMobileDevice()
        {
            return Regex.IsMatch(Request.UserAgent, "(blackberry|bb1\\w?;|playbook|meego;\\s*nokia|android|silk|iphone|ipad|ipod|windows phone|Mobile.*Firefox)", RegexOptions.IgnoreCase);
        }

        public ActionResult SectionIndex(string product, string section)
        {
            var isMobileDevice = IsMobileDevice();

            var redirect = Redirect(Url.ApplyProduct(Url.Action("Index", new { product = product, section = section, example = "index" })));

            if (product == "mobile" && isMobileDevice)
            {
                redirect = RedirectPermanent(Url.RouteUrl("MobileDeviceIndex"));
            }

            return redirect;
        }

        protected void FindCurrentExample()
        {
           var found = false;

           foreach (NavigationWidget widget in ViewBag.Navigation)
           {
               foreach (NavigationExample example in widget.Items)
               {
                   if (!example.Url.Contains("overview") && example.ShouldInclude)
                   {
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
    }
}
