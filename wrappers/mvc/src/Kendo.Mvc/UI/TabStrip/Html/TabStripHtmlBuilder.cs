namespace Kendo.Mvc.UI
{

    using Infrastructure;

    public class TabStripHtmlBuilder: NavigationHtmlBuilderBase<TabStrip, TabStripItem>
    {
        public TabStripHtmlBuilder(TabStrip tabStrip)
            : base(tabStrip)
        {
        }

        public IHtmlNode TabStripTag()
        {
            IHtmlNode div = ComponentTag("div")
                .PrependClass(UIPrimitives.Widget, "k-tabstrip", UIPrimitives.Header);

            new HtmlElement("ul").AddClass(UIPrimitives.ResetStyle, "k-tabstrip-items").AppendTo(div);

            return div;
        }

        public IHtmlNode TabStripWrapperTag()
        {
            IHtmlNode div = new HtmlElement("div").AddClass("k-tabstrip-wrapper");

            return div;
        }

        public IHtmlNode ItemTag(TabStripItem item)
        {
            return ListItemTag(item, li =>
            {
                if (item.Selected)
                {
                    li.AddClass(UIPrimitives.ActiveState);
                }
                else if (!item.Enabled)
                {
                    li.AddClass(UIPrimitives.DisabledState);
                }
                
                li.PrependClass(UIPrimitives.DefaultState);
            });
        }

        public IHtmlNode ItemInnerTag(TabStripItem item)
        {
            IHtmlNode link = LinkTag(item, delegate { });
            if (!string.IsNullOrEmpty(item.ContentUrl))
            {
                link.RemoveAttribute("href");
            }

            return link;
        }

        public IHtmlNode ItemContentTag(TabStripItem item)
        {
            return ContentTag(item)
                .ToggleClass(UIPrimitives.ActiveState, item.Selected)
                .ToggleCss("display", "block", item.Selected);
        }
    }
}
