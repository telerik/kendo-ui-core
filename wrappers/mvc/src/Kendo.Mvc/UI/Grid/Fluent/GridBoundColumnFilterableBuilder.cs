namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring bound columns filterable options
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class GridBoundColumnFilterableBuilder : IHideObjectMembers        
    {
        private readonly IGridBoundColumn column;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridBoundColumnFilterableBuilder"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GridBoundColumnFilterableBuilder(IGridBoundColumn column)            
        {
            this.column = column;
        }

        /// <summary>
        /// Enables or disables filtering the column. All bound columns are filterable by default.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Filterable(filterable => filterable.Enabled(true)))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnFilterableBuilder Enabled(bool value)
        {
            column.Filterable = value;

            return this;
        }

        /// <summary>
        /// Sets the type of the input element of the filter menu
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Filterable(filterable => filterable.UI(GridFilterUIRole.DatePicker))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnFilterableBuilder UI(GridFilterUIRole role)
        {
            column.FilterUIRole = role;
            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Filterable(filterable => filterable.UI(GridFilterUIRole.DatePicker))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnFilterableBuilder UI(Func<object, object> handler)
        {            
            column.FilterUIHandler.TemplateDelegate = handler;
            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>        
        public GridBoundColumnFilterableBuilder UI(string handler)
        {            
            column.FilterUIHandler.HandlerName= handler;
            return this;
        }
    }
}