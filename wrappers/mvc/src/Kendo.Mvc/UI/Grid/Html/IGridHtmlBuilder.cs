namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    
    public interface IGridHtmlBuilder
    {
        IHtmlNode CreateGrid(IDictionary<string, object> htmlAttributes, GridFunctionalData header, GridRenderingData body);
    }
}
