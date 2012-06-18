namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;

    class GridPagerInputSectionBuilder : IGridPagerInputBuilder
    {
        public IHtmlNode Create(GridPagerData section)
        {
            var div = new HtmlElement("span")
                .AddClass("k-pager-input", "k-label");

            var page = new LiteralNode(section.Messages.Page);

            page.AppendTo(div);

            var input = new HtmlElement("input", TagRenderMode.SelfClosing)
                .Attribute("type", "text")
                .AddClass("k-textbox")
                .Attribute("value", section.Page.ToString());

            input.AppendTo(div);

            var of = new LiteralNode(string.Format(section.Messages.Of, section.TotalPages));

            of.AppendTo(div);

            return div;
        }
    }
}