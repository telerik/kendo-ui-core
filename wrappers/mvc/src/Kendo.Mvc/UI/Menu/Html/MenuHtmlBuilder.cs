namespace Kendo.Mvc.UI
{
    using System.Linq;

    using Infrastructure;

    public class MenuHtmlBuilder : NavigationHtmlBuilderBase<Menu, MenuItem>, INavigationComponentHtmlBuilder<MenuItem>
    {
        public MenuHtmlBuilder(Menu menu)
            : base(menu)
        {
        }

        public IHtmlNode ChildrenTag(MenuItem item)
        {
            return ListTag();
        }

        public IHtmlNode Build()
        {
            IHtmlNode rootTag = ComponentTag("ul")
                .PrependClass(UIPrimitives.Widget, UIPrimitives.ResetStyle, UIPrimitives.Header, "k-menu")
                .ToggleClass("k-menu-vertical", Component.Orientation == MenuOrientation.Vertical);

            return rootTag;
        }

        public IHtmlNode ItemTag(MenuItem item)
        {
            return ListItemTag(item, li =>
            {
                if (item.Selected)
                {
                    li.AddClass(UIPrimitives.SelectedState);
                }
                else
                {
                    li.AddClass(UIPrimitives.DefaultState);
                }
            });
        }

        public IHtmlNode ItemContentTag(MenuItem item)
        {
            IHtmlNode ul = ListTag();

            IHtmlNode li = new HtmlElement("li")
                .AddClass(UIPrimitives.Item)
                .AppendTo(ul);

            ContentTag(item)
                .AppendTo(li);

            return ul;
        }

        public IHtmlNode ItemInnerContentTag(MenuItem item, bool hasAccessibleChildren)
        {
            IHtmlNode a = this.LinkTag(item, delegate { });

            if (hasAccessibleChildren || item.Template.HasValue())
            {
                string iconClass = "k-i-arrow-e";

                if (Component.Orientation == MenuOrientation.Horizontal && item.Parent == null)
                {
                    iconClass = "k-i-arrow-s";
                }

                new HtmlElement("span")
                    .AddClass(UIPrimitives.Icon, iconClass)
                    .AppendTo(a);
            }

            return a;
        }
    }
}
