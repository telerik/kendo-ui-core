using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Windows.Navigation;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

namespace Telerik.KendoBootstrapper
{
    public partial class KendoBootstrapperWindow : Window
    {
        private JArray documentationItems;
        private string selection;

        public KendoBootstrapperWindow(string htmlResult)
        {
            InitializeComponent();
            documentationBrowser.NavigateToString(htmlResult);
        }

        public KendoBootstrapperWindow(string output, string sel)
        {
            InitializeComponent();

            this.documentationItems = JArray.Parse(output);
            this.selection = sel;

            documentationBrowser.NavigateToString(BuildHtmlPage(BuildResultsList(), BuildResultsListCssStyles(), false));
        }

        private string BuildHtmlPage(StringBuilder content, StringBuilder styles, bool shouldPrettify)
        {
            StringBuilder page = new StringBuilder();

            page.Append("<!DOCTYPE html><html><head><meta charset=\"utf-8\">");

            if (styles != null && styles.Length > 0)
            {
                page.Append("<style>" + styles.ToString() + "</style>");
            }

            if (shouldPrettify)
            {
                page.Append("<script src=\"https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js\"></script>");
            }

            page.Append("</head><body>");
            page.Append(content.ToString());
            page.Append("</body></html>");

            return page.ToString();
        }

        private StringBuilder BuildResultsList()
        {
            StringBuilder result = new StringBuilder();

            result.AppendFormat("<p id=\"resultsCount\">{0} search results for <strong style=\"color: #2e2e2e;\">'{1}'</strong>. {2}</p>", documentationItems.Count, selection, documentationItems.Count > 0 ? "Click on the component that you are using for further details." : "");

            if (documentationItems.Count > 0)
            {
                result.Append("<div class=\"result\">");

                foreach (JToken item in documentationItems.Children())
                {
                    result.AppendFormat("<h3><a href=\"{0}\">{0}</a></h3>", item["widget"]);
                    result.Append("<div>" + item["prop"]["short_doc"] + "</div>");
                }

                result.Append("</div>");
            }

            return result;
        }

        private StringBuilder BuildResultsListCssStyles()
        {
            StringBuilder cssStyles = new StringBuilder();
            cssStyles.Append("#resultsCount { font-family: Arial, Helvetica, sans-serif;font-size: 13px; color: #656565; line-height: 1em; padding-bottom: 6px; margin-bottom: 15px; border-bottom: 1px solid #dadada; }");
            cssStyles.Append(".result { font-family: Arial, Helvetica, sans-serif; }");
            cssStyles.Append(".result h3 { font-size: 16px; font-weight: bold; color: #2e2e2e; padding: 15px 0 0 0; margin: 25px 0 0 0; word-wrap: break-word; border-top: 1px dotted #bbb; }");
            cssStyles.Append(".result h3 a { color: #2e2e2e; text-decoration: none; } .result h3 a:hover { color: #e15613; }");
            cssStyles.Append(".result div { font-size: 13px; line-height: 1.33em; color: #656565; }");

            return cssStyles;
        }

        private StringBuilder BuildDetailsPage(JToken item)
        {
            StringBuilder result = new StringBuilder();

            result.Append("<div class=\"bodyText\"><h1>" + item["widget"] + "</h1>");

            string itemType = item["type"].ToString();

            switch (itemType)
            {
                case "method":
                    result.Append(BuildMethodAndEventDetailsPage(item));
                    break;
                case "event":
                    result.Append(BuildMethodAndEventDetailsPage(item));
                    break;
                case "config":
                    result.Append(BuildConfigDetailsPage(item, false));
                    break;
                default:
                    break;
            }

            result.Append("</div>");

            return result;
        }

        private StringBuilder BuildDetailsPageCssStyles()
        {
            StringBuilder cssStyles = new StringBuilder();

            cssStyles.Append(".bodyText { font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.33em; color: #656565; }");
            cssStyles.Append(".bodyText h1 { font-size: 35px; line-height: 1.2em; padding: 0; margin: 0; word-wrap: break-word; width: 100%; color: #444; font-weight: normal; }");
            cssStyles.Append(".bodyText h3 { font-size: 16px; font-weight: bold; color: #2e2e2e; padding: 15px 0 0 0; margin: 25px 0 0 0; word-wrap: break-word; border-top: 1px dotted #bbb; line-height: 1em; }");
            cssStyles.Append(".bodyText h3 code { color: #e15613; padding: 0 5px; font-family: monospace; }");
            cssStyles.Append(".bodyText .configWrapper > p { padding-top: 5px; padding-bottom: 5px; margin-top: 0; margin-bottom: 0; }");
            cssStyles.Append(".bodyText .configWrapper h4 { font-size: 13px; font-weight: bold; line-height: 1.33em; padding: 5px 0 0 0; margin: 0; word-wrap: break-word; }");
            cssStyles.Append(".bodyText .configWrapper pre { margin-top: 5px; margin-bottom: 5px; padding: 0; border: 1px solid #dadada; background: #fbfbfb; color: #000; border-radius: 3px; box-shadow: 0 0 7px #dadada inset; }");
            cssStyles.Append(".bodyText .configWrapper h4.details-title { padding: 10px 10px 3px 10px; font-weight: bold; color: #656565; }");
            cssStyles.Append(".details-list { margin-top: 5px; margin-bottom: 5px padding: 0; border: 1px solid #dadada; background: #fbfbfb; color: #000; border-radius: 3px; box-shadow: 0 0 7px #dadada inset; }");
            cssStyles.Append(".details-list dl { overflow: hidden; margin: 0 10px; padding: 0; border: 0; border-top: 1px solid #dadada; font-size: 12px; border-radius: 3px; }");
            cssStyles.Append(".details-list dt { clear: left; float: left; width: 50%; overflow: auto; font-weight: bold; display: block; margin: 0; padding: 5px 0; }");
            cssStyles.Append(".details-list dt code { font-weight: normal; font-family: monospace; }");
            cssStyles.Append(".details-list dd { margin: 0; margin-left: 10px; padding: 5px 0; padding-left: 50%; display: block; }");
            cssStyles.Append(".details-list dd p { padding-top: 5px; padding-bottom: 5px; margin-top: 0; margin-bottom: 0; }");

            return cssStyles;
        }

        private StringBuilder BuildConfigDetailsPage(JToken item, bool isSubProperty)
        {
            StringBuilder result = new StringBuilder();

            JToken propertyName = isSubProperty ? item["orig"] : item["prop"]["name"];
            JToken propertyType = isSubProperty ? item["type"] : item["prop"]["type"];
            JToken propertyDocs = isSubProperty ? item["doc"] : item["prop"]["doc"];
            JToken subProperties = isSubProperty ? item["sub"] : item["prop"]["sub"];

            
            result.Append("<h3>" + propertyName + "<code>" + String.Join("|", propertyType) + "</code></h3>");
            result.Append("<div class=\"configWrapper\">" + PretifyExample(propertyDocs) + "</div>");

            if (subProperties != null)
            {
                foreach (var sub in subProperties)
                {
                    result.Append(BuildConfigDetailsPage(sub, true));
                }
            }

            return result;
        }

        private StringBuilder BuildMethodAndEventDetailsPage(JToken item)
        {
            StringBuilder result = new StringBuilder();

            result.Append("<h3>" + item["prop"]["name"] + "</h3>");
            result.Append("<div class=\"configWrapper\">" + item["prop"]["short_doc"]);

            if (item["prop"]["args"] != null && item["prop"]["args"].Count() > 0)
            {
                result.Append("<div class=\"details-list\"><h4 class=\"details-title\">Parameters</h4>");

                foreach (var arg in item["prop"]["args"])
                {
                    result.Append("<dl>");
                    result.Append("<dt>" + arg["name"] + " <code>" + String.Join("|", arg["type"]) + "</code></dt>");
                    result.Append("<dd>" + arg["doc"] + "</dd>");
                    result.Append("</dl>");
                }

                result.Append("</div>");
            }

            if (item["prop"]["examples"] != null)
            {
                foreach (var example in item["prop"]["examples"])
                {
                    result.Append(PretifyExample(example));
                }
            }
            
            result.Append("</div>");

            return result;
        }

        private string PretifyExample(JToken example)
        {
            return Regex.Replace(example.ToString(), "<pre>", "<pre class=\"prettyprint\">");
        }

        private void onBrowserNavigate(object sender, NavigatingCancelEventArgs e)
        {
            if (e.Uri == null)
            {
                return;
            }

            if (e.Uri.IsAbsoluteUri)
            {
                if (e.Uri.AbsoluteUri.StartsWith("http://"))
                {
                    e.Cancel = true;
                    Process.Start(new ProcessStartInfo { FileName = e.Uri.ToString() });
                }

                if (e.Uri.AbsoluteUri.StartsWith("about:/api"))
                {
                    e.Cancel = true;

                    Process.Start(new ProcessStartInfo { FileName = "http://docs.telerik.com/kendo-ui" + e.Uri.AbsoluteUri.Substring(6) });
                }
                else if (e.Uri.AbsoluteUri.StartsWith("about:kendo"))
                {
                    string currentWidget = e.Uri.LocalPath;

                    foreach (JToken item in documentationItems.Children())
                    {
                        if (item["widget"].ToString() == currentWidget)
                        {
                            documentationBrowser.NavigateToString(BuildHtmlPage(BuildDetailsPage(item), BuildDetailsPageCssStyles(), true));
                        }
                    }
                }
            }

            e.Cancel = true;
        }
    }
}
