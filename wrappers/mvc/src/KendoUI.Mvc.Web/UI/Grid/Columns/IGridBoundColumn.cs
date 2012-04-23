// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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
