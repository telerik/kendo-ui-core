namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;
    using Extensions;

    public class GridDetailRowBuilder : IGridRowBuilder
    {
        public GridDetailRowBuilder()
        {
            HtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
        }

        public int Colspan
        {
            get;
            set;
        }

        public object DataItem
        {
            get;
            set;
        }

        public Action<object, IHtmlNode> Template
        {
            get;
            set;
        }

        public string Html
        {
            get;
            set;
        }

        public IDictionary<string, object> HtmlAttributes
        {
            get; internal set;
        }

        public bool Expanded
        {
            get;
            set;
        }

        public bool IsMasterAlternate
        {
            get;
            set;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr")
                .Attributes(HtmlAttributes)
                .PrependClass(IsMasterAlternate ? UIPrimitives.Alt : "")
                .PrependClass("k-detail-row");

            if (!Expanded)
            {
                tr.Css("display", "none");
            }

            var td = new HtmlElement("td")
                .AddClass("k-detail-cell")
                .Attribute("colspan", Colspan.ToString())
                .AppendTo(tr);

            AppendContent(td);

            return tr;
        }

        private void AppendContent(IHtmlNode td)
        {
            if (Html.HasValue())
            {
                td.Html(Html);
            }
            else if (Template != null)
            {
                Template(DataItem, td);
            }
        }
    }
}