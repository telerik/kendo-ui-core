namespace Kendo.Mvc.UI
{
    public interface INavigationComponentHtmlBuilderFactory<TComponent, TItem>
        where TComponent : WidgetBase, INavigationItemComponent<TItem>
        where TItem : NavigationItem<TItem>, IContentContainer, INavigationItemContainer<TItem>
    {
        INavigationComponentHtmlBuilder<TItem> Create(TComponent component);
    }
}