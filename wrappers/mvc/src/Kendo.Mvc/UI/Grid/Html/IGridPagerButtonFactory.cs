namespace Kendo.Mvc.UI.Html
{
    public interface IGridPagerButtonFactory
    {
        IHtmlNode CreateButton(GridPagerButtonType buttonType, bool enabled, string url, string text, int page, bool inClientTemplate = false);
    }

    public enum GridPagerButtonType
    {
        Icon = 0,
        NumericLink
    }
}