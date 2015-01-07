using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections.Generic;
using Kendo.Models;
using System.Collections.Specialized;
using System.Configuration;
using System.Text;

namespace Kendo.Extensions
{
    public static class HtmlExtensions
    {
        public static IHtmlString ExampleLink(this HtmlHelper html, NavigationExample example)
        {
            var href = html.ExampleUrl(example);

            var className = "";

            if (example.New) {
                className += "new-example";
            }

            var routeData = html.ViewContext.RouteData;
            var currentAction = routeData.Values["section"];
            var currentController = routeData.Values["example"];
            if (href.EndsWith(currentAction + "/" + currentController))
            {
                className += " active";
            }

            StringBuilder link = new StringBuilder();

            link.Append("<a ");

            if (!String.IsNullOrEmpty(className)) {
                link.Append("class=\"" + className + "\" ");
            }

            if (example.External) {
                link.Append("rel=\"external\"");
            }

            link.Append("href=\"" + href + "\">");

            if (example.New)
            {
                link.Append("<span class=\"new-widget\"></span>");
            }

            link.Append(example.Text).Append("</a>");

            return html.Raw(link.ToString());
        }

        public static string ExampleUrl(this HtmlHelper html, NavigationExample example)
        {
            var sectionAndExample = example.Url.Split('/');

            return new UrlHelper(html.ViewContext.RequestContext).ExampleUrl(sectionAndExample[0], sectionAndExample[1]);
        }

        public static string ProductExampleUrl(this HtmlHelper html, NavigationExample example, string product)
        {
            var viewBag = html.ViewContext.Controller.ViewBag;

            var currentProduct = (string)viewBag.Product;

            return html.ExampleUrl(example).Replace(currentProduct, product);
        }

        public static String CdnRoot(this HtmlHelper html)
        {
#if DEBUG
            return "http://cdn.kendostatic.com/2013.3.1324";
#else
            return ConfigurationManager.AppSettings["CDN_ROOT"];
#endif
        }

        public static String DojoRoot(this HtmlHelper html)
        {
#if DEBUG
            return "http://127.0.0.1:3000/";
#else
            return ConfigurationManager.AppSettings["DOJO_ROOT"];
#endif
        }

        public static IHtmlString WidgetLink(this HtmlHelper html, NavigationWidget widget)
        {
            var viewBag = html.ViewContext.Controller.ViewBag;

            var href = html.ExampleUrl(widget.Items[0]);

            var text = widget.Text;

            if (widget.Tablet)
            {
                text += " (tablet)";
            }

            var className = "";

            if (widget.Pro && (widget.New || widget.Beta)) {
                className = "multiple-tags";
            }

            StringBuilder link = new StringBuilder();

            link.Append("<a ");

            if (!string.IsNullOrEmpty(className))
            {
                link.AppendFormat("class=\"{0}\" ", className);
            }

            link.AppendFormat("href=\"{0}\">", href);
            link.Append(text);

            if (widget.Pro)
            {
                link.Append("<span title=\"Available only in Kendo UI Professional\" class=\"pro-widget\"></span>");
            }

            if (widget.Beta)
            {
                link.Append("<span class=\"beta-widget\"></span>");
            }

            if (widget.New)
            {
                link.Append("<span class=\"new-widget\"></span>");
            }

            link.Append("</a>");

            return html.Raw(link.ToString());
        }

        public static bool MergesWithNext(this HtmlHelper html, string category)
        {
            category = category.ToLower();

            return category.Contains("applications") || category.Contains("gauges") || category.Contains("financial") || category.Contains("geoviz");
        }

        public static string StyleRel(this HtmlHelper html, string styleName) {
            if (styleName.ToLowerInvariant().EndsWith("less")) {
                return "stylesheet/less";
            }

            return "stylesheet";
        }

        public static IHtmlString StyleLink(this HtmlHelper html, string styleName) {
            var urlHelper = new UrlHelper(html.ViewContext.RequestContext);
            var url = urlHelper.Style(styleName);
            return html.Raw("<link href=\"" + url + "\" rel=\"" + html.StyleRel(styleName) + "\" />");
        }

        public static IHtmlString StyleLink(this HtmlHelper html, string styleName, string theme, string common) {
            var urlHelper = new UrlHelper(html.ViewContext.RequestContext);
            var url = urlHelper.Style(styleName, theme, common);
            return html.Raw("<link href=\"" + url + "\" rel=\"" + html.StyleRel(styleName) + "\" />");
        }

        public static string NavigationWrapperClass(this HtmlHelper html, string category)
        {
            var classNames = new List<string> { "floatWrap" };

            category = category.ToLower();

            if (category.Contains("ui") || category.Contains("dashboard"))
            {
                classNames.Add("wideCol");
            }
            else
            {
                classNames.Add("narrowCol");
            }

            if (category.Contains("application") || category.Contains("dashboard"))
            {
                classNames.Add("dashboards");
            }
            else if (category.Contains("themes"))
            {
                classNames.Add("custom-themes");
            }
            else if (category.Equals("framework"))
            {
                classNames.Add("framework");
            }
            else if (category.Contains("mobile widgets"))
            {
                classNames.Add("mobile-widgets");
            }
            else if (category.Contains("mobile framework"))
            {
                classNames.Add("mobile-framework");
            }
            else if (category.Contains("chart"))
            {
                classNames.Add("chart");
            }
            else if (category.Contains("gauges"))
            {
                classNames.Add("gauges");
            }
            else if (category.Contains("qr codes"))
            {
                classNames.Add("qrcodes");
            }
            else if (category.Contains("financial"))
            {
                classNames.Add("financial");
            }
            else if (category.Contains("geoviz"))
            {
                classNames.Add("geoviz");
            }

            return String.Join(" ", classNames);
        }
    }
}
