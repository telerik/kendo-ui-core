// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Infrastructure;

    class GridPagerButtonFactory : IGridPagerButtonFactory
    {
        public IHtmlNode CreateButton(GridPagerButtonType buttonType, string text, bool enabled, string url)
        {
            if (buttonType == GridPagerButtonType.Icon)
            {
                return GetIconButton(enabled, url, text);
            }
            return GetNumericButton(enabled, url, text);
        }

        protected virtual IHtmlNode GetNumericButton(bool enabled, string url, string text)
        {
            var result = new HtmlElement(enabled ? "a" : "span")
                .Text(text)
                .ToggleClass(UIPrimitives.Link, enabled)
                .ToggleAttribute("href", url, enabled)
                .ToggleClass(UIPrimitives.ActiveState, !enabled);

            return result;
        }

        protected virtual IHtmlNode GetIconButton(bool enabled, string url, string text)
        {
            var a = new HtmlElement("a")
                .AddClass(UIPrimitives.Link)
                .ToggleClass(UIPrimitives.DisabledState, !enabled)
                .Attribute("href", url)
                .ToggleAttribute("href", "#", !enabled);

            var span = new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, "t-arrow-" + text)
                .Text(text);

            span.AppendTo(a);
            return a;
        }
    }
}