// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    public class GridEditRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        public override bool ShouldDecorate(GridItem item)
        {
            return item.Type == GridItemType.EditRow || item.Type == GridItemType.InsertRow;
        }

        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            htmlNode.AddClass("t-grid-edit-row");
        }
    }
}