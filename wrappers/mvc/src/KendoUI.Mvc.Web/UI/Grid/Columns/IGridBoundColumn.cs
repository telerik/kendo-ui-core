

namespace KendoUI.Mvc.UI
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

#if MVC2 || MVC3
        object AdditionalViewData 
        { 
            get;
            set; 
        }

        string EditorHtml
        {
            get;
        }

        bool ReadOnly
        {
            get;
            set;
        }

        string EditorTemplateName
        {
            get; 
            set;
        }
#endif
        ICollection<AggregateFunction> Aggregates
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
