namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;

    class GridPagerInputSectionBuilder : IGridPagerInputBuilder
    {
        public IHtmlNode Create(GridPagerData section)
        {
            var span = new HtmlElement("span")
                .AddClass("k-pager-input", "k-label");

            var page = new LiteralNode(section.Messages.Page);

            page.AppendTo(span);

            var input = new HtmlElement("input", TagRenderMode.SelfClosing)
                .Attribute("type", "text")
                .AddClass("k-textbox")
                .Attribute("value", section.Page.ToString());

            input.AppendTo(span);

            var of = new LiteralNode(string.Format(section.Messages.Of, section.TotalPages));

            of.AppendTo(span);

            return span;
        }
    }
}