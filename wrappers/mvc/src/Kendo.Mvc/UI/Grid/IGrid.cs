namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    public interface IGrid : IGridBindingContext
    {
        bool HasDetailView
        {
            get;
        }

        GridPagingSettings Paging
        {
            get;
        }

        GridSortSettings Sorting
        {
            get;
        }

        GridScrollingSettings Scrolling
        {
            get;
        }

        GridKeyboardNavigationSettings KeyboardNavigation
        {
            get;
        }

        GridColumnContextMenuSettings ColumnContextMenu
        {
            get;
        }

        bool IsSelfInitialized
        {
            get;
        }

        string EditorHtml 
        { 
            get; 
        }

        GridResizingSettings Resizing
        {
            get;
        }        
        
        GridReorderingSettings Reordering
        {
            get;
        }

        DataSource DataSource 
        { 
            get;
        }

        GridFilteringSettings Filtering
        {
            get;
        }

        GridGroupingSettings Grouping
        {
            get;
        }

        IGridEditingSettings Editing 
        { 
            get; 
        }

        bool IsClientBinding
        {
            get;
        }

        IUrlGenerator UrlGenerator
        {
            get;
        }

        IGridUrlBuilder UrlBuilder
        {
            get;
        }

        ViewContext ViewContext
        {
            get;
        }

        IEnumerable<IGridColumn> Columns
        {
            get;
        }

        IEnumerable<IDataKey> DataKeys
        {
            get;
        }

        bool IsEmpty
        {
            get;
        }

        void SerializeDataSource(IClientSideObjectWriter writer);
    }
}
