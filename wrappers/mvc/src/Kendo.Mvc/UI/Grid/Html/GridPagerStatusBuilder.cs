namespace Kendo.Mvc.UI.Html
{
    using System;
    using Kendo.Mvc.Extensions;

    class GridPagerStatusBuilder : IGridPagerStatusBuilder
    {
        public IHtmlNode Create(GridPagerData pager)
        {
            var firstItemInPage = pager.Total > 0 ? (pager.Page - 1) * pager.PageSize + 1 : 0;
            var lastItemInPage = Math.Min(pager.PageSize * pager.Page, pager.Total);

            return new HtmlElement("span")
                        .AddClass("k-pager-info", "k-label")
                        .Text(pager.Messages.Display.FormatWith(firstItemInPage, lastItemInPage, pager.Total));
        }
    }
}