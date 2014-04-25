using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using Kendo.Models;
using Kendo.Extensions;
using System.Web;

namespace Kendo.Controllers
{
    public class DemoController : BaseController
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
            ViewBag.Product = product;
            ViewBag.Section = section;
            ViewBag.Example = example;
            ViewBag.ExampleFiles = SourceCode(product, section, example);
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            LoadNavigation();

            FindCurrentExample();
            FindSiblingExamples();
            FindEdgeExamples();

            if (ViewBag.Mobile) {
                if (ViewBag.CurrentExample.Url.StartsWith("adaptive") && IsMobileDevice())
                {
                    return Redirect(Url.RouteUrl("MobileDeviceIndex"));
                }
            }

            ViewBag.Documentation = ViewBag.CurrentExample.Documentation ?? ViewBag.CurrentWidget.Documentation;

            return View(
                string.Format("~/Views/demos/{0}/{1}.cshtml", section, example)
            );
        }

        private static readonly IDictionary<string, IFrameworkDescription> frameworkDescriptions = new Dictionary<string, IFrameworkDescription>
        {
            { "kendo-ui", new HtmlDescription() },
            { "aspnet-mvc", new AspNetMvcDescription() },
            { "jsp-ui", new JspDescription() },
            { "php-ui", new PhpDescription() },
        };

        private IEnumerable<ExampleFile> SourceCode(string product, string section, string example)
        {
            IFrameworkDescription framework = frameworkDescriptions[product];

            return framework.GetFiles(Server, example, section).Where(file => file.Exists(Server));
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

           NavigationExample overview = null;
           NavigationExample current = null;
           NavigationWidget currentWidget = null;

           foreach (NavigationWidget widget in ViewBag.Navigation)
           {
               foreach (NavigationExample example in widget.Items)
               {
                   if (!found && example.Url.Contains("overview"))
                   {
                       overview = example;
                       currentWidget = widget;
                   }

                   if (!example.Url.Contains("overview") && example.ShouldInclude)
                   {
                       examplesUrl.Add("~/" + example.Url);
                   }

                   if (!found && IsCurrentExample(Request, example))
                   {
                       current = example;
                       currentWidget = widget;
                       found = true;
                   }
               }
           }

           if (!found)
           {
               current = overview;
           }

           ViewBag.CurrentWidget = currentWidget;
           ViewBag.Mobile = currentWidget.Mobile;
           ViewBag.CurrentExample = current;
           ViewBag.Title = current.Title ?? current.Text;
           ViewBag.Meta = current.Meta;
           ViewBag.Description = current.Description;
        }

        private bool IsCurrentExample(HttpRequestBase request, NavigationExample example)
        {
            return Request.Path.EndsWith("/" + example.Url) || (ViewBag.Example == "result" && example.Url == "upload/index.html");
        }

        protected void FindSiblingExamples()
        {
            if (ViewBag.CurrentExample != null)
            {
                var url = "~/" + ViewBag.CurrentExample.Url;
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
                var first = "~/" + items[0].Url;
                var last = "~/" + items[items.Length - 1].Url;

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
