namespace Kendo.Mvc.UI.Html
{
    public interface IGridPagerRefreshBuilder
    {
        IHtmlNode Create(string url, string refreshText);
    }

    class GridPagerRefreshBuilder : IGridPagerRefreshBuilder
    {
        public IHtmlNode Create(string url, string refreshText)
        {
            var a = new HtmlElement("a")
                .Attribute("href", url)
                .Attribute("title", refreshText)
                .AddClass("k-pager-refresh k-link");

            new HtmlElement("span")
                .AddClass("k-icon", "k-i-refresh")
                .Text(refreshText)
                .AppendTo(a);

            return a;
        }
    }
}
