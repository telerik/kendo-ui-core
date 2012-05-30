namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    
    public interface IHtmlBuilder
    {
        IHtmlNode Build();
        
        IList<IHtmlAdorner> Adorners
        {
            get;
        }
    }
}
