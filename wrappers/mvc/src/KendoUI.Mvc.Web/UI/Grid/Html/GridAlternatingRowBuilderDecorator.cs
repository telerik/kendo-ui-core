// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridAlternatingRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        public override bool ShouldDecorate(GridItem gridItem)
        {
            return (gridItem.State & GridItemStates.Alternating) == GridItemStates.Alternating 
                   && gridItem.Type != GridItemType.EmptyRow &&
                   gridItem.Type != GridItemType.GroupRow;
        }

        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            htmlNode.AddClass("t-alt");
        }
    }
}