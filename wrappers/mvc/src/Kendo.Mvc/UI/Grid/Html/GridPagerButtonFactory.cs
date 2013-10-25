using System.Globalization;

namespace Kendo.Mvc.UI.Html
{
    class GridPagerButtonFactory : IGridPagerButtonFactory
    {       
        public IHtmlNode CreateButton(GridPagerButtonType buttonType, bool enabled, string url, string text, int page, bool inClientTemplate)
        {
            if (buttonType == GridPagerButtonType.Icon)
            {
                return GetIconButton(enabled, url, text, page, inClientTemplate);
            }

            return GetNumericButton(enabled, url, text, page);
        }

        protected virtual IHtmlNode GetNumericButton(bool enabled, string url, string text, int page)
        {
            var button = new HtmlElement(enabled ? "a" : "span")
                .Text(text)
                .ToggleClass(UIPrimitives.Link, enabled)
                .ToggleAttribute("href", url, enabled)
                .Attribute("data-page", page.ToString(CultureInfo.InvariantCulture))
                .ToggleClass(UIPrimitives.SelectedState, !enabled);

            var li = new HtmlElement("li");

            button.AppendTo(li);

            return li;
        }

        protected virtual IHtmlNode GetIconButton(bool enabled, string url, string text, int page, bool inClientTemplate)
        {
            var disabledUrl = inClientTemplate ? "\\#" : "#";

            var a = new HtmlElement("a")
                .AddClass(UIPrimitives.Link)
                .AddClass(UIPrimitives.Grid.PagerNavigation)
                .ToggleClass(UIPrimitives.DisabledState, !enabled)
                .ToggleClass("k-pager-first", text == "seek-w")
                .ToggleClass("k-pager-last", text == "seek-e")
                .Attribute("href", url)
                .Attribute("data-page", page.ToString(CultureInfo.InvariantCulture))
                .ToggleAttribute("href", disabledUrl, !enabled);

            var span = new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, "k-i-" + text)
                .Text(text);

            span.AppendTo(a);
            return a;
        }
    }
}