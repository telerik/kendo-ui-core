// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
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

#if MVC2 || MVC3
        string EditorHtml 
        { 
            get; 
        }
#endif
        GridResizingSettings Resizing
        {
            get;
        }        
        
        GridReorderingSettings Reordering
        {
            get;
        }

        GridDataProcessor DataProcessor 
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

        GridBindingSettings Server
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

        IEnumerable<IGridDataKey> DataKeys
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
