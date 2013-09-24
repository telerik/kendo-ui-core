using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}
