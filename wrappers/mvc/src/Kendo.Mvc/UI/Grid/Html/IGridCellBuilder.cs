namespace Kendo.Mvc.UI.Html
{
    public interface IGridCellBuilder : IGridDecoratableCellBuilder
    {
        IHtmlNode CreateCell();
    }
}