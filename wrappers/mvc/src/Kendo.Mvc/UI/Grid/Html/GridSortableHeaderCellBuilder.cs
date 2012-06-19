namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;

    public class GridSortableHeaderCellBuilder : GridHeaderCellBuilder
    {
        private readonly string url;

        private readonly ListSortDirection? sortDirection;

        public GridSortableHeaderCellBuilder(IDictionary<string, object> htmlAttributes, string url, ListSortDirection? sortDirection, Action<IHtmlNode> appendContent) : base(htmlAttributes, appendContent)
        {
            this.sortDirection = sortDirection;
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
                                .ToggleClass("k-arrow-down", sortDirection == ListSortDirection.Descending);

                sortIcon.AppendTo(container);
            }
        }
    }
}
