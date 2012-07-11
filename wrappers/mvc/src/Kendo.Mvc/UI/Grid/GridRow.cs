namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Represents a row from Kendo Grid for ASP.NET MVC
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class GridRow<T>
        where T : class
    {
        public GridRow(Grid<T> grid, T dataItem, int index)
        {
            HtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            Grid = grid;
            DataItem = dataItem;
            Index = index;
            IsAlternate = (index % 2) != 0;
        }

        public Grid<T> Grid
        {
            get;
            private set;
        }

        public GridDetailRow<T> DetailRow
        {
            get;
            set;
        }

        public T DataItem
        {
            get;
            set;
        }

        public int Index
        {
            get;
            private set;
        }

        public bool IsAlternate
        {
            get;
            set;
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
        public GridCell<T> CreateCellFor(GridColumnBase<T> column)
        {
            var cell = new GridCell<T>(column, DataItem)
            {
                InEditMode = InEditMode,
                InInsertMode = InInsertMode,
                Selected = Selected
            };

            if (column.Template != null)
            {
                cell.Template.CodeBlockTemplate = column.Template;
            }
            
            if (column.InlineTemplate != null)
            {
                cell.Template.InlineTemplate = column.InlineTemplate;
            }

            return cell;
        }

    }
}