namespace Kendo.Mvc.UI.Html
{
    public interface IGridRowBuilderFactory
    {
        IGridRowBuilder CreateBuilder(GridRenderingData renderingData, GridItem item);

        IGridRowBuilder CreateHeaderBuilder(GridRenderingData renderingData);
        
        IGridRowBuilder CreateFooterBuilder(GridRenderingData renderingData);
    }
}
