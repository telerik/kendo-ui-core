namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    public interface IGrid
    {
        bool HasDetailTemplate
        {
            get;
        }

        bool EnableCustomBinding
        {
            get;
        }

        string Prefix(string value);

        PagerSettings Paging
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

        bool IsSelfInitialized
        {
            get;
        }

        string EditorHtml 
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

        IUrlGenerator UrlGenerator
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
    }
}
