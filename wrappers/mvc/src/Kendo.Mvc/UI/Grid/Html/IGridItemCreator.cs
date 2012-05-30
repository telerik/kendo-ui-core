namespace Kendo.Mvc.UI.Html
{
    public interface IGridItemCreator
    {
        GridItem CreateItem(object dataItem);

        GridItem CreateInsertItem();

        GridItem CreateGroupFooterItem(object dataItem);
    }
}