namespace Kendo.Mvc.UI.Html
{
    public interface IGridDataSectionBuilder
    {
        IHtmlNode CreateBody(GridRenderingData data);

        IHtmlNode CreateHeader(GridRenderingData data);

        IHtmlNode CreateFooter(GridRenderingData data);
    }
}
