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

        PageableSettings Pageable
        {
            get;
        }

        GridSortableSettings Sortable
        {
            get;
        }

        GridScrollableSettings Scrollable
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

        GridFilterableSettings Filterable
        {
            get;
        }

        GridGroupableSettings Grouping
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
