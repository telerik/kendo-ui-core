namespace KendoUI.Mvc.UI.Html
{
    public interface IGridPagerBuilder
    {
        IHtmlNode Create(GridPagerData section);
        
        IHtmlNode CreateRefreshButton(GridPagerData pagerData);
    }
}