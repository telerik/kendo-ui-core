namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;

    public class GridGroupFooterRowBuilder : GridRowBuilder
    {
        public GridGroupFooterRowBuilder(IEnumerable<IGridCellBuilder> cellBuilders) 
            : base(cellBuilders)
        {
        }

        public override IHtmlNode CreateRow()
        {
            var tr = base.CreateRow();
            tr.AddClass(UIPrimitives.Grid.GroupFooter);
            return tr;
        }
    }
}