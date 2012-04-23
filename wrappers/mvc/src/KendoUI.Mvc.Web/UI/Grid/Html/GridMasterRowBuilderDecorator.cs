// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridMasterRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        public override bool ShouldDecorate(GridItem gridItem)
        {
            return gridItem.Type != GridItemType.EmptyRow &&
                   gridItem.Type != GridItemType.GroupRow &&
                   gridItem.Type != GridItemType.DetailRow &&
                   (gridItem.State & GridItemStates.Master) == GridItemStates.Master;
        }

        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            htmlNode.AddClass("t-master-row");
        }
    }
}