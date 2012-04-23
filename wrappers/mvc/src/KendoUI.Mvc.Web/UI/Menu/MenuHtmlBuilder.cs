// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Linq;

    using Infrastructure;

    public class MenuHtmlBuilder : NavigationHtmlBuilderBase<Menu, MenuItem>, INavigationComponentHtmlBuilder<MenuItem>
    {
        public MenuHtmlBuilder(Menu menu, IActionMethodCache actionMethodCache)
            : base(menu, actionMethodCache)
        {
        }

        public IHtmlNode ChildrenTag(MenuItem item)
        {
            return ListTag();
        }

        public IHtmlNode Build()
        {
            IHtmlNode rootTag = ComponentTag("ul")
                .PrependClass(UIPrimitives.Widget, UIPrimitives.ResetStyle, UIPrimitives.Header, "t-menu")
                .ToggleClass("t-menu-vertical", Component.Orientation == MenuOrientation.Vertical);

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
                string iconClass = "t-arrow-next";

                if (Component.Orientation == MenuOrientation.Horizontal && item.Parent == null)
                {
                    iconClass = "t-arrow-down";
                }

                new HtmlElement("span")
                    .AddClass(UIPrimitives.Icon, iconClass)
                    .AppendTo(a);
            }

            return a;
        }
    }
}
