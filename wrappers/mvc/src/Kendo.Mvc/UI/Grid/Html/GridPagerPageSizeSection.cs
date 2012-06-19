using System.Globalization;

namespace Kendo.Mvc.UI.Html
{
    class GridPagerPageSizeSection : IGridPagerPageSizeSection
    {
        public IHtmlNode Create(GridPagerData section)
        {
            var span = new HtmlElement("span")
                .AddClass("k-pager-sizes", "k-label");

            var select = new HtmlElement("select")
                .AppendTo(span);

            foreach (var pageSize in section.PageSizes)
            {
                new HtmlElement("option").Text(pageSize.ToString(CultureInfo.InvariantCulture)).AppendTo(select);
            }

            new LiteralNode(section.Messages.ItemsPerPage).AppendTo(span);

            return span;
        }
    }
}