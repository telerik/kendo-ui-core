namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;

    public interface IGridBoundColumn : IGridColumn
    {
        string Format 
        { 
            get;
            set; 
        }

        bool Groupable
        {
            get;
            set;
        }
        
        bool Filterable
        {
            get;
            set;
        }

        GridFilterUIRole FilterUIRole
        {
            get;
            set;
        }

        ClientHandlerDescriptor FilterUIHandler
        {
            get;
            set;
        }

        bool Sortable
        {
            get;
            set;
        }

        string Member
        {
            get;
            set;
        }

        Type MemberType
        {
            get;
            set;
        }

        ListSortDirection? SortDirection
        {
            get;
        }

        object AdditionalViewData 
        { 
            get;
            set; 
        }

        string EditorHtml
        {
            get;
        }

        string EditorTemplateName
        {
            get; 
            set;
        }

        string ClientGroupHeaderTemplate
        {
            get;
            set;
        }

        string ClientGroupFooterTemplate
        {
            get;
            set;
        }

        HtmlTemplate<GridAggregateResult> GroupFooterTemplate
        {
            get;
        }

        HtmlTemplate<GridGroupAggregateResult> GroupHeaderTemplate
        {
            get;
        }
    }
}
