namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Represents a cell from Kendo Grid for ASP.NET MVC
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class GridCell<T> where T : class
    {
        public GridCell(GridColumnBase<T> column, T dataItem)
        {
            Column = column;
            Grid = column.Grid;
            DataItem = dataItem;
            Template = new HtmlTemplate<T>();
            
            HtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);            
            HtmlAttributes.Merge(column.HtmlAttributes);
        }

        public Grid<T> Grid 
        { 
            get; 
            private set; 
        }
        
        public HtmlTemplate<T> Template
        {
            get;
            private set;
        }
        
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        public bool Selected
        {
            get;
            set;
        }

        public T DataItem
        {
            get;
            private set;
        }

        public GridColumnBase<T> Column
        {
            get;
            private set;
        }

        public string Text
        {
            get
            {
                return Template.Html;
            }
            set
            {
                Template.Html = value;
            }
        }

        public Action<T> Content
        {
            get
            {
                return Template.CodeBlockTemplate;
            }
            set
            {
                Template.CodeBlockTemplate = value;
            }
        }

        public bool InEditMode
        {
            get;
            set;
        }

        public bool InInsertMode
        {
            get;
            set;
        }
    }
}