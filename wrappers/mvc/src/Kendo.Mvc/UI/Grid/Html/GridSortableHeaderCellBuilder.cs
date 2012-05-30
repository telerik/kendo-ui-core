namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using Kendo.Mvc.Infrastructure;

    public class GridSortableHeaderCellBuilder : GridHeaderCellBuilder
    {
        private readonly string url;

        private readonly ListSortDirection? sortDirection;
        private string sortedAscText;
        private string sortedDescText;

        public GridSortableHeaderCellBuilder(IDictionary<string, object> htmlAttributes, string url, ListSortDirection? sortDirection, string sortedAscText, string sortedDescText, Action<IHtmlNode> appendContent) :
            base(htmlAttributes, appendContent)
        {
            this.sortDirection = sortDirection;
            this.sortedAscText = sortedAscText;
            this.sortedDescText = sortedDescText;
            this.url = url;
        }

        public override IHtmlNode CreateCell()
        {
            var th = CreateContainer();

            if (sortDirection.HasValue)
            {
                th.Attribute("data-dir", sortDirection == ListSortDirection.Ascending ? "asc" : "desc");
            }

            var sortLink = new HtmlElement("a").AddClass(UIPrimitives.Link)
                                           .Attribute("href", url);

            sortLink.AppendTo(th);

            AppendContent(sortLink);

            AppendSortIcon(sortLink);

            Decorate(th);

            return th;
        }
        
        private void AppendSortIcon(IHtmlNode container)
        {
            if (sortDirection != null)
            {
                var sortIcon = new HtmlElement("span")
                                .AddClass(UIPrimitives.Icon)
                                .ToggleClass("k-arrow-up", sortDirection == ListSortDirection.Ascending)
                                .ToggleClass("k-arrow-down", sortDirection == ListSortDirection.Descending)
                                .Text(String.Format("({0})", sortDirection == ListSortDirection.Ascending ? sortedAscText : sortedDescText));

                sortIcon.AppendTo(container);
            }
        }
    }
}
