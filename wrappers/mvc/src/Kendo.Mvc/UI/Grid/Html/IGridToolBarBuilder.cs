namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;

    public interface IGridToolBarBuilder
    {
        IHtmlNode CreateToolBar(IEnumerable<IGridButtonBuilder> commandBuilders);

        IHtmlNode CreateToolBar(HtmlTemplate template);
    }
}
