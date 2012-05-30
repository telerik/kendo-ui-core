namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    using System.Linq;

    public class GridTableBuilderFactory : IGridTableBulderFactory
    {
        public IGridTableBuilder CreateTableBuilder(IEnumerable<GridColData> colsData)
        {
            return new GridTableBuilder(colsData);
        }

        public IGridTableBuilder CreateDecoratedTableBuilder(IEnumerable<GridColData> colsData, GridRenderingData renderingData)
        {
            var tableBuilder = CreateTableBuilder(colsData);
            tableBuilder.Decorators.Add(new GridTableBuilderGroupColDecorator(renderingData.GroupMembers.Count()));
            tableBuilder.Decorators.Add(new GridTableBuilderDetailViewColDecorator(renderingData.HasDetailTemplate));
            return tableBuilder;
        }
    }
}