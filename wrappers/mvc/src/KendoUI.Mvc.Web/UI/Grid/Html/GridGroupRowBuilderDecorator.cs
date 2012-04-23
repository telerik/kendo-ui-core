// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Infrastructure;

    public class GridGroupRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            for (int i = 0; i < CurrentGridItem.GroupLevel; i++)
            {
                var td = CreateCell();

                htmlNode.Children.Insert(0, td);
            }
        }

        private bool IsHeaderRow()
        {
            return CurrentGridItem.Type == GridItemType.HeaderRow;
        }

        private IHtmlNode CreateCell()
        {
            var tagName = IsHeaderRow() ? "th" : "td";

            return new HtmlElement(tagName).AddClass(UIPrimitives.Grid.GroupCell)
                                    .ToggleClass(UIPrimitives.Header, IsHeaderRow())
                                    .Html("&nbsp;");
        }

        public override bool ShouldDecorate(GridItem gridItem)
        {
            return gridItem.Type != GridItemType.EmptyRow;
        }
    }
}