namespace Kendo.Mvc.UI.Html
{
    class GridPagerButtonFactory : IGridPagerButtonFactory
    {
        public IHtmlNode CreateButton(GridPagerButtonType buttonType, bool enabled, string url, string text, int page)
        {
            if (buttonType == GridPagerButtonType.Icon)
            {
                return GetIconButton(enabled, url, text);
            }

            return GetNumericButton(enabled, url, text, page);
        }

        protected virtual IHtmlNode GetNumericButton(bool enabled, string url, string text, int page)
        {
            var button = new HtmlElement(enabled ? "a" : "span")
                .Text(text)
                .ToggleClass(UIPrimitives.Link, enabled)
                .ToggleAttribute("href", url, enabled)
                .Attribute("data-page", page.ToString())
                .ToggleClass(UIPrimitives.ActiveState, !enabled);

            var li = new HtmlElement("li");

            button.AppendTo(li);

            return li;
        }

        protected virtual IHtmlNode GetIconButton(bool enabled, string url, string text)
        {
            var a = new HtmlElement("a")
                .AddClass(UIPrimitives.Link)
                .ToggleClass(UIPrimitives.DisabledState, !enabled)
                .Attribute("href", url)
                .ToggleAttribute("href", "#", !enabled);

            var span = new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, "k-" + text)
                .Text(text);

            span.AppendTo(a);
            return a;
        }
    }
}