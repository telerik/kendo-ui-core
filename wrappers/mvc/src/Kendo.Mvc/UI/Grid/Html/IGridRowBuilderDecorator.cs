namespace Kendo.Mvc.UI.Html
{
    public interface IGridRowBuilderDecorator : IGridRowBuilder
    {
        void Decorate(IGridRowBuilder rowBuilder, GridItem gridItem, bool hasDetailView);
        
        bool ShouldDecorate(GridItem gridItem);
    }
}