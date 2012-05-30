namespace Kendo.Mvc.UI
{
    public interface INavigationComponentHtmlBuilderFactory<TComponent, TItem>
        where TComponent : ViewComponentBase, INavigationItemComponent<TItem>
        where TItem : NavigationItem<TItem>, IContentContainer, INavigationItemContainer<TItem>
    {
        INavigationComponentHtmlBuilder<TItem> Create(TComponent component);
    }
}