namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;
    using Kendo.Mvc.UI.Html;

    public interface IGridColumn
    {
        bool IsLast
        {
            get;
        }

        string ClientTemplate
        {
            get;
            set;
        }
        
        string ClientFooterTemplate
        {
            get;
            set;
        }

        //TODO: Implement HeaderTemplate
        /*
        HtmlTemplate HeaderTemplate
        {
            get;
            set;
        }
        */

        HtmlTemplate<GridAggregateResult> FooterTemplate
        {
            get;
            set;
        }

        bool Encoded
        {
            get;
            set;
        }

        //TODO: Expose header html attributes
        /*
        IDictionary<string, object> HeaderHtmlAttributes 
        { 
            get; 
        }
        */

        //TODO: Expose footer html attributes
        /*
        IDictionary<string, object> FooterHtmlAttributes
        {
            get;
        }
         */

        //TODO: Implement hidden columns
        /*
        bool Hidden 
        { 
            get; 
            set; 
        }*/

        //TODO: Implement HeaderContextMenu
        /*
        bool IncludeInContextMenu
        {
            get;
            set;
        }
        */        
        
        IDictionary<string, object> HtmlAttributes 
        { 
            get; 
        }
        
        string Title 
        { 
            get; 
            set; 
        }
        /*
        bool Visible 
        { 
            get; 
            set; 
        }
        */
        string Width 
        { 
            get; 
            set; 
        }

        IGrid Grid
        {
            get;
        }

        IGridDataCellBuilder CreateDisplayBuilder(IGridHtmlHelper htmlHelper);

        IGridDataCellBuilder CreateEditBuilder(IGridHtmlHelper htmlHelper);

        IGridDataCellBuilder CreateInsertBuilder(IGridHtmlHelper htmlHelper);

        IGridCellBuilder CreateHeaderBuilder();

        IGridCellBuilder CreateFooterBuilder(IEnumerable<AggregateResult> aggregateResults);
        
        IGridCellBuilder CreateGroupFooterBuilder(IEnumerable<AggregateResult> aggregatesResults);
    }
}
