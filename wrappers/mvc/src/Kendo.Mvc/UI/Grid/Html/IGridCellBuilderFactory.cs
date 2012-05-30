namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    using Infrastructure;

    public interface IGridCellBuilderFactory
    {
        IGridDataCellBuilder CreateDisplayCellBuilder(IGridColumn column, IGridHtmlHelper htmlHelper);

        IGridDataCellBuilder CreateEditCellBuilder(IGridColumn column, IGridHtmlHelper htmlHelper);
        
        IGridDataCellBuilder CreateInsertCellBuilder(IGridColumn column, IGridHtmlHelper htmlHelper);

        IGridCellBuilder CreateHeaderCellBuilder(IGridColumn column);
        
        IGridCellBuilder CreateFooterCellBuilder(IGridColumn column, IEnumerable<AggregateResult> aggregatesResults);
        
        IGridCellBuilder CreateGroupFooterCellBuilder(IGridColumn column, IEnumerable<AggregateResult> aggregatesResults);
    }
}