

namespace KendoUI.Mvc.UI.Html
{
    public interface IGridFunctionalSectionBuilder
    {
        IHtmlNode CreateToolBar(GridToolBarData toolBarData);
        
        IHtmlNode CreateGroupHeader(GridGroupingData renderingData);
        
        IHtmlNode CreatePager(GridPagerData pagerSection);

        IHtmlNode CreateRefreshButton(GridPagerData pagerData);
    }
}