using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI.Html;

namespace Kendo.Mvc.UI
{
    public interface IGridColumnGroup : IGridColumn
    {
        IEnumerable<IGridColumn> Columns { get; } 
    }

    public class GridColumnGroup<T> : GridColumnBase<T>, IGridColumnGroup, IGridColumnContainer<T> where T : class
    {
        public GridColumnGroup(Grid<T> grid) : base(grid)
        {
            Columns = new List<GridColumnBase<T>>();
        }

        protected override Html.IGridDataCellBuilder CreateEditBuilderCore(Html.IGridHtmlHelper htmlHelper)
        {
            throw new NotImplementedException();
        }

        protected override Html.IGridDataCellBuilder CreateInsertBuilderCore(Html.IGridHtmlHelper htmlHelper)
        {
            throw new NotImplementedException();
        }

        protected override Html.IGridCellBuilder CreateHeaderBuilderCore()
        {
            var colSpan = Columns.LeafColumns().Count();
            HeaderHtmlAttributes["colSpan"] = colSpan;
            HeaderHtmlAttributes["data-colspan"] = colSpan;

            return base.CreateHeaderBuilderCore(); 
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            var columns = Columns.Select(c => c.ToJson());

            if (columns.Any())
            {
                json["columns"] = columns;
            }
        }

        /// <summary>
        /// Gets the columns in the group
        /// </summary>
        public IList<GridColumnBase<T>> Columns
        {
            get;
            private set;
        }

        IEnumerable<IGridColumn> IGridColumnGroup.Columns
        {
            get
            {
                return Columns.Cast<IGridColumn>();
            }
        }
    }
    
}
