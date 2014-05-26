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
        public ActionResult Index(string section, string example)
        {
            var product = CurrentProduct();

            if (example == null)
            {
                return RedirectToRoutePermanent("Demo", new { section = section, example = "index" });
            }

            ViewBag.ShowCodeStrip = true;
            ViewBag.Product = product;
            ViewBag.NavProduct = CurrentNavProduct();
            ViewBag.Section = section;
            ViewBag.Example = example;
            ViewBag.ExampleFiles = SourceCode(product, section, example);
#if DEBUG
            ViewBag.Debug = true;
#else
            ViewBag.Debug = false;
#endif

            LoadNavigation();
            LoadCategories();

            FindCurrentExample(product);
            FindSiblingExamples();
            FindEdgeExamples();

            if (ViewBag.Mobile) {
                if (ViewBag.CurrentExample.Url.StartsWith("adaptive") && IsMobileDevice())
                {
                    return Redirect(Url.RouteUrl("MobileDeviceIndex"));
                }
            }

            var api = ViewBag.CurrentExample.Api ?? ViewBag.CurrentWidget.Api;

            if (!string.IsNullOrEmpty(api))
            {
                if (product == "kendo-ui")
                {
                    ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/" + api;
                }
                else if (product == "php-ui")
                {
                    ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/wrappers/php/kendo/ui" + Regex.Replace(api, "(web|dataviz|mobile)", "");
                }
                else if (product == "jsp-ui")
                {
                    ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/wrappers/jsp" + Regex.Replace(api, "(web|dataviz|mobile)", "");
                }
                else if (product == "aspnet-mvc")
                {
                    ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/wrappers/aspnet-mvc/kendo.mvc.ui.fluent" + Regex.Replace(api, "(web|dataviz|mobile)", "") + "builder";
                }
            }

            NavigationWidget currentWidget = ViewBag.CurrentWidget;

            if (currentWidget.Documentation != null && currentWidget.Documentation.ContainsKey(product))
            {
                ViewBag.Documentation = "http://docs.telerik.com/kendo-ui/" + currentWidget.Documentation[product];
            }

            if (currentWidget.Forum != null && currentWidget.Forum.ContainsKey(product))
            {
                ViewBag.Forum = "http://www.telerik.com/forums/" + currentWidget.Forum[product];
            }

            if (currentWidget.CodeLibrary != null && currentWidget.CodeLibrary.ContainsKey(product))
            {
                ViewBag.CodeLibrary = "http://www.telerik.com/support/code-library/" + currentWidget.CodeLibrary[product];
            }

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

        protected void FindCurrentExample(string product)
        {
           var found = false;

           NavigationExample current = null;
           NavigationWidget currentWidget = null;

           foreach (NavigationWidget widget in ViewBag.Navigation)
           {
               foreach (NavigationExample example in widget.Items)
               {
                   if (example.ShouldInclude(product))
                   {
                       examplesUrl.Add("~/" + example.Url);
                   }

                   if (!found && IsCurrentExample(example.Url))
                   {
                       current = example;
                       currentWidget = widget;
                       found = true;
                   }
               }
           }

           ViewBag.CurrentWidget = currentWidget;
           ViewBag.Mobile = currentWidget.Mobile;
           ViewBag.CurrentExample = current;

           if (current.Title != null)
           {
               if (current.Title.ContainsKey(product))
               {
                   ViewBag.Title = current.Title[product];
               }
               else
               {
                   ViewBag.Title = current.Title["kendo-ui"];
               }
           }
           else
           {
               ViewBag.Title = current.Text;
           }

           if (current.Meta != null)
           {
               if (current.Meta.ContainsKey(product))
               {
                   ViewBag.Meta = current.Meta[product];
               }
               else
               {
                   ViewBag.Meta = current.Meta["kendo-ui"];
               }
           }
        }

        private bool IsCurrentExample(string url)
        {
            var section = ControllerContext.RouteData.GetRequiredString("section");
            var example = ControllerContext.RouteData.GetRequiredString("example");

            var components = url.Split('/');

            return (section == components[0] && example == components[1]) || (section == "upload" && example == "result" && components[0] == "upload" && components[1] == "index");
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
