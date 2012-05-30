namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    
    public class GridDetailRow<T>
        where T : class
    {
        public GridDetailRow()
        {
            HtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
        }

        public bool Expanded
        {
            get;
            set;
        }

        public IDictionary<string,object> HtmlAttributes 
        { 
            get; 
            private set; 
        }

        public string Html
        {
            get;
            set;
        }
    }
}
