namespace KendoUI.Mvc.UI
{

    using Infrastructure;

    public class TabStripHtmlBuilder: NavigationHtmlBuilderBase<TabStrip, TabStripItem>, ITabStripHtmlBuilder
    {
        public TabStripHtmlBuilder(TabStrip tabStrip, IActionMethodCache actionMethodCache)
            : base(tabStrip, actionMethodCache)
        {
        }

        public IHtmlNode TabStripTag()
        {
            IHtmlNode div = ComponentTag("div")
                .PrependClass(UIPrimitives.Widget, "t-tabstrip", UIPrimitives.Header);

            new HtmlElement("ul").AddClass(UIPrimitives.ResetStyle, "t-tabstrip-items").AppendTo(div);

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
            return LinkTag(item, delegate { });
        }

        public IHtmlNode ItemContentTag(TabStripItem item)
        {
            return ContentTag(item)
                .ToggleClass(UIPrimitives.ActiveState, item.Selected)
                .ToggleCss("display", "block", item.Selected);
        }
    }
}