namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;

    public class GridItem
    {
        public GridItem()
        {
            HtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            DetailRowHtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
        }

        public GridItemType Type
        {
            get;
            set;
        }

        public object DataItem
        {
            get;
            set;
        }

        public int GroupLevel
        {
            get; 
            set;
        }

        public GridItemStates State
        {
            get;
            set;
        }

        public int Index
        {
            get; 
            set;
        }

        public IDictionary<string, object> DetailRowHtmlAttributes
        {
            get;
            set;
        }        
        
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            set;
        }

        public virtual bool Expanded
        {
            get;
            set;
        }

        public string DetailRowHtml
        {
            get;
            set;
        }
    }
}