// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{

    using Extensions;
    using Infrastructure;

    public class PanelBarHtmlBuilder : NavigationHtmlBuilderBase<PanelBar, PanelBarItem>, INavigationComponentHtmlBuilder<PanelBarItem>
    {
        public PanelBarHtmlBuilder(PanelBar panelBar, IActionMethodCache actionMethodCache)
            : base(panelBar, actionMethodCache)
        {
        }

        public IHtmlNode ChildrenTag(PanelBarItem item)
        {
            IHtmlNode ul = ListTag();

            if(!item.Enabled)
                ul.Attribute("style", "display:none");
            else if (item.Enabled && !item.Expanded)
                ul.Attribute("style", "display:none");

            return ul;
        }

        public IHtmlNode Build()
        {
            return ComponentTag("ul")
                .PrependClass(UIPrimitives.Widget, "t-panelbar", UIPrimitives.ResetStyle);
        }

        public IHtmlNode ItemTag(PanelBarItem item)
        {
            return ListItemTag(item, li =>
            {
                if (item.Expanded)
                {
                    li.PrependClass(UIPrimitives.ActiveState);
                }
                else if (!item.Selected)
                {
                    li.PrependClass(UIPrimitives.DefaultState);
                }
            });
        }

        public IHtmlNode ItemInnerContentTag(PanelBarItem item, bool hasAccessibleChildren)
        {
            IHtmlNode a = LinkTag(item, tag =>
            {
                if (item.Parent == null)
                {
                    tag.PrependClass(UIPrimitives.Header);
                }

                if (item.Selected)
                {
                    tag.PrependClass(UIPrimitives.SelectedState);
                }
            });

            if (hasAccessibleChildren || item.Template.HasValue() || item.ContentUrl.HasValue())
            {
                new HtmlElement("span")
                    .AddClass(UIPrimitives.Icon)
                    .ToggleClass("t-arrow-up", item.Expanded)
                    .ToggleClass("t-panelbar-collapse", item.Expanded)
                    .ToggleClass("t-arrow-down", !item.Expanded)
                    .ToggleClass("t-panelbar-expand", !item.Expanded)
                    .AppendTo(a);
            }

            return a;
        }

        public IHtmlNode ItemContentTag(PanelBarItem item)
        {
            IHtmlNode div = ContentTag(item);

            if (!item.Expanded || item.ContentUrl.HasValue() || !item.Enabled)
            {
                div.Attribute("style", "display:none");
            }

            return div;
        }
    }
}
