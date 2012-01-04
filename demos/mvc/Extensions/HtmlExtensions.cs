using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Extensions
{
    public static class HtmlExtensions
    {
        public static IHtmlString SuiteLink(this HtmlHelper html, string title, string cssClass = "")
        {
            var suite = title.ToLowerInvariant();
            var Url = new UrlHelper(html.ViewContext.RequestContext);
            var viewBag = html.ViewContext.Controller.ViewBag;
            var selectedClass = viewBag.Suite == suite ? " selected" : "";

            return html.Raw(
                string.Format("<a id='{0}' class='{1}' href='{2}'>{3}</a>",
                    suite,
                    cssClass + selectedClass,
                    Url.Content("~/" + suite),
                    title
                )
            );
        }
    }
}