namespace Kendo.Mvc.UI.Html
{
    class GridPagerPageSizeSection : IGridPagerPageSizeSection
    {
        public IHtmlNode Create(GridPagerData section)
        {
            var div = new HtmlElement("div")
                .AddClass("t-page-size");

            var dropDown = new HtmlElement("div")
                .AddClass("t-dropdown", "t-header")
                .Css("width","50px")
                .AppendTo(div);

            var wrapper = new HtmlElement("div")
                .AddClass("t-dropdown-wrap", "t-state-default")
                .AppendTo(dropDown);

            new HtmlElement("span")
                .AddClass("t-input")
                .Text(section.PageSize.ToString())
                .AppendTo(wrapper);

            var select = new HtmlElement("span")
                .AddClass("t-select").AppendTo(wrapper);

            new HtmlElement("span")
                .AddClass("t-icon", "t-arrow-down")
                .Text("select")
                .AppendTo(select);

            return div;
        }
    }
}