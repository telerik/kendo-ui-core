

namespace KendoUI.Mvc.UI.Html
{
    public interface IGridPagerButtonFactory
    {
        IHtmlNode CreateButton(GridPagerButtonType buttonType, string text, bool enabled, string url);
    }

    public enum GridPagerButtonType
    {
        Icon = 0,
        NumericLink
    }
}