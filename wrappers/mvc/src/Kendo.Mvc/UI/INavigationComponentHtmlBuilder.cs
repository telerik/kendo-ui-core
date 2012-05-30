namespace Kendo.Mvc.UI
{
    public interface INavigationComponentHtmlBuilder<TItem>
        where TItem : NavigationItem<TItem>, IContentContainer
    {
        IHtmlNode Build();

        IHtmlNode ItemTag(TItem item);

        IHtmlNode ItemContentTag(TItem item);

        IHtmlNode ItemInnerContentTag(TItem item, bool hasAccessibleChildren);

        IHtmlNode ChildrenTag(TItem item); //from panelbar
    }
}
