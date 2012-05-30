namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    
    public interface IGridDataCellBuilder : IGridDecoratableCellBuilder
    {
        string Html
        {
            get;
            set;
        }
        
        IHtmlNode CreateCell(object dataItem);

        IDictionary<string, object> HtmlAttributes
        {
            get;
        }

        Action<object> Callback
        {
            get;
            set;
        }
    }
}