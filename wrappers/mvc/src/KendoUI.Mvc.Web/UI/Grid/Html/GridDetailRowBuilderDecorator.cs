// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Infrastructure;

    public class GridDetailRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            var tagName = IsHeaderRow() ? "th" : "td";

            var td = new HtmlElement(tagName)
                .AddClass(UIPrimitives.Grid.HierarchyCell)
                .ToggleClass(UIPrimitives.Header, IsHeaderRow())
                .ToggleAttribute("scope","col", IsHeaderRow())
                .Html("&nbsp;");

            if ((CurrentGridItem.State & GridItemStates.Master) == GridItemStates.Master)
            {
                td.Html(string.Empty);
                var a = new HtmlElement("a")
                        .Attribute("href", "#")
                        .AddClass(UIPrimitives.Icon)
                        .ToggleClass("t-plus", !CurrentGridItem.Expanded)
                        .ToggleClass("t-minus", CurrentGridItem.Expanded);

                a.AppendTo(td);
            }

            htmlNode.Children.Insert(CurrentGridItem.GroupLevel, td);
        }

        private bool IsHeaderRow()
        {
            return CurrentGridItem.Type == GridItemType.HeaderRow;
        }

        public override bool ShouldDecorate(GridItem gridItem)
        {
            return HasDetailView && gridItem.Type != GridItemType.EmptyRow && 
                   gridItem.Type != GridItemType.GroupRow;
        }
    }
}