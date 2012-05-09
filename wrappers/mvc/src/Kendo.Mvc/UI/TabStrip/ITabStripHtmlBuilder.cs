namespace Kendo.Mvc.UI
{

    public interface ITabStripHtmlBuilder
    {
        IHtmlNode TabStripTag();

        IHtmlNode ItemTag(TabStripItem item);

        IHtmlNode ItemInnerTag(TabStripItem item);

        IHtmlNode ItemContentTag(TabStripItem item);
    }
}