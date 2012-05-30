namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    
    public interface IGridTableBulderFactory
    {
        IGridTableBuilder CreateTableBuilder(IEnumerable<GridColData> colsData);
        IGridTableBuilder CreateDecoratedTableBuilder(IEnumerable<GridColData> colsData, GridRenderingData renderingData);
    }
}