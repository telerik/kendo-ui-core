namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring bound columns filterable options
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class GridBoundColumnFilterableBuilder : GridFilterableSettingsBuilderBase<GridBoundColumnFilterableBuilder>      
    {
        private readonly GridBoundColumnFilterableSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridBoundColumnFilterableBuilder"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GridBoundColumnFilterableBuilder(GridBoundColumnFilterableSettings settings) : base(settings)       
        {
            this.settings = settings;
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
            settings.FilterUIRole = role;
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
            settings.FilterUIHandler.TemplateDelegate = handler;
            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>        
        public GridBoundColumnFilterableBuilder UI(string handler)
        {
            settings.FilterUIHandler.HandlerName = handler;
            return this;
        }        
    }
}