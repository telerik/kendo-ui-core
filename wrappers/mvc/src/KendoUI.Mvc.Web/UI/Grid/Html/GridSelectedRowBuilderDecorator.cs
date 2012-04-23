// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridSelectedRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        public override bool ShouldDecorate(GridItem gridItem)
        {
            return (gridItem.State & GridItemStates.Selected) == GridItemStates.Selected
                    && gridItem.Type != GridItemType.DetailRow
                   && gridItem.Type != GridItemType.EmptyRow &&
                   gridItem.Type != GridItemType.GroupRow;
        }

        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            htmlNode.AddClass("t-state-selected");
        }
    }
}