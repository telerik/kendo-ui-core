namespace Kendo.Mvc.UI
{
    using System.Linq;

    using Infrastructure;

    public class ContextMenuHtmlBuilder : NavigationHtmlBuilderBase<ContextMenu, ContextMenuItem>, INavigationComponentHtmlBuilder<ContextMenuItem>
    {
        public ContextMenuHtmlBuilder(ContextMenu menu)
            : base(menu)
        {
        }

        public IHtmlNode ChildrenTag(ContextMenuItem item)
        {
            return ListTag();
        }

        public IHtmlNode Build()
        {
            IHtmlNode rootTag = ComponentTag("ul")
                .PrependClass(UIPrimitives.Widget, UIPrimitives.ResetStyle, UIPrimitives.Header, "k-menu k-context-menu")
                .ToggleClass("k-menu-horizontal", Component.Orientation == ContextMenuOrientation.Horizontal);

            return rootTag;
        }

        public IHtmlNode ItemTag(ContextMenuItem item)
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

        public IHtmlNode ItemContentTag(ContextMenuItem item)
        {
            IHtmlNode ul = ListTag();

            IHtmlNode li = new HtmlElement("li")
                .AddClass(UIPrimitives.Item)
                .AppendTo(ul);

            ContentTag(item)
                .AppendTo(li);

            return ul;
        }

        public IHtmlNode ItemInnerContentTag(ContextMenuItem item, bool hasAccessibleChildren)
        {
            IHtmlNode a = LinkTag(item);

            if (hasAccessibleChildren || item.Template.HasValue())
            {
                string iconClass = "k-i-arrow-e";

                if (Component.Orientation == ContextMenuOrientation.Horizontal && item.Parent == null)
                {
                    iconClass = "k-i-arrow-s";
                }

                new HtmlElement("span")
                    .AddClass(UIPrimitives.Icon, iconClass)
                    .AppendTo(a);
            }

            return a;
        }

        public IHtmlNode LinkTag(ContextMenuItem item)
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
