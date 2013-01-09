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
            IHtmlNode a = LinkTag(item);

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

        public IHtmlNode LinkTag(MenuItem item)
        {
            var url = Component.GetItemUrl(item);

            IHtmlNode a;

            if (url != "#" && !url.StartsWith("#" + Component.Id))
            {
                a = new HtmlElement("a").Attribute("href", url);
            }
            else
            {
                a = new HtmlElement("span");
            }

            a.Attributes(item.LinkHtmlAttributes);

            a.PrependClass(UIPrimitives.Link);

            if (!string.IsNullOrEmpty(item.ImageUrl))
            {
                ImageTag(item).AppendTo(a);
            }

            if (!string.IsNullOrEmpty(item.SpriteCssClasses))
            {
                SpriteTag(item).AppendTo(a);
            }

            Text(item).AppendTo(a);

            return a;
        }
    }
}
