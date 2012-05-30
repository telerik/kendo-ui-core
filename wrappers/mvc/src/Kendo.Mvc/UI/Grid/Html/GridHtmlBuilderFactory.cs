namespace Kendo.Mvc.UI.Html
{
    public class GridHtmlBuilderFactory : IGridHtmlBuilderFactory
    {
        private readonly IGridDataSectionBuilder dataSectionBuilder;

        private readonly IGridFunctionalSectionBuilder functionalSectionBuilder;

        private readonly IGridTableBulderFactory tableBuilderFactory;

        public GridHtmlBuilderFactory(IGridFunctionalSectionBuilder functionalSectionBuilder, IGridDataSectionBuilder dataSectionBuilder, 
            IGridTableBulderFactory tableBuilderFactory)
        {
            this.tableBuilderFactory = tableBuilderFactory;
            this.functionalSectionBuilder = functionalSectionBuilder;
            this.dataSectionBuilder = dataSectionBuilder;
        }

        public IGridHtmlBuilder CreateBuilder(bool scrollable)
        {
            if (scrollable)
            {
                return new GridScrollingHtmlBuilder(functionalSectionBuilder, dataSectionBuilder, tableBuilderFactory);
            }

            return new GridHtmlBuilder(functionalSectionBuilder, dataSectionBuilder, tableBuilderFactory);
        }
    }
}