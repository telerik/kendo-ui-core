using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections.Generic;

namespace Kendo.Extensions
{
    public static class HtmlExtensions
    {
        public static IHtmlString SuiteLink(this HtmlHelper html, string suite, string title = "", string cssClass = "")
        {
            title = string.IsNullOrEmpty(title) ? suite : title;
            suite = suite.ToLowerInvariant();
            var Url = new UrlHelper(html.ViewContext.RequestContext);
            var viewBag = html.ViewContext.Controller.ViewBag;
            var selectedClass = viewBag.Suite == suite ? " selected" : "";
            var href = "~/" + suite;

            if (suite != "mobile") {
                href = "~/" + suite + "/overview/index.html";
            }

            return html.Raw(
                string.Format("<a id=\"{0}\" class=\"{1}\" href=\"{2}\">{3}</a>",
                    suite,
                    (cssClass + selectedClass).Trim(),
                    Url.Content(href),
                    title
                )
            );
        }

        public static IHtmlString ActiveSuiteClass(this HtmlHelper html, string title)
        {
            if (html.ViewContext.HttpContext.Request.Path.Contains(title.ToLowerInvariant()))
            {
                return html.Raw(" class=\"active\"");
            }

            return html.Raw("");
        }

        public static string NavigationWrapperClass(this HtmlHelper html, string category)
        {
            var classNames = new List<string> { "floatWrap" };

            category = category.ToLower();

            if (category.Contains("ui") || category.Contains("dashboard")) {
                classNames.Add("wideCol");
            } else {
                classNames.Add("narrowCol");
            }

            if (category.Contains("application") || category.Contains("dashboard")) {
                classNames.Add("dashboards");
            } else if (category.Contains("framework")) {
                classNames.Add("framework");
            } else if (category.Contains("mobile widgets")) {
                classNames.Add("mobile-widgets");
            } else if (category.Contains("mobile framework")) {
                classNames.Add("mobile-framework");
            } else if (category.Contains("chart")) {
                classNames.Add("chart");
            } else if (category.Contains("gauges")) {
                classNames.Add("gauges");
            } else if (category.Contains("qrcodes")) {
                classNames.Add("qrcodes");
            } else if (category.Contains("financial")) {
                classNames.Add("financial");
            } else if (category.Contains("geoviz")) {
                classNames.Add("geoviz");
            }
            
            return String.Join(" ", classNames);
        }
    }
}
