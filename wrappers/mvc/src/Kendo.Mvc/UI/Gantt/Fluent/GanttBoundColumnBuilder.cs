namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring bound columns
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class GanttBoundColumnBuilder<TTaskModel, TDependenciesModel> : GanttColumnBuilderBase<IGanttBoundColumn, GanttBoundColumnBuilder<TTaskModel, TDependenciesModel>>
        where TTaskModel : class, IGanttTask
        where TDependenciesModel : class, IGanttDependency
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GanttBoundColumnBuilder{T}"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GanttBoundColumnBuilder(IGanttBoundColumn column)
            : base(column)
        {            
        }

        /// <summary>
        /// Gets or sets the format for displaying the data.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Gantt(Model)
        ///             .Name("Gantt")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Format("{0:dd/MM/yyyy}"))
        /// %&gt;
        /// </code>
        /// </example>        
        public GanttBoundColumnBuilder<TTaskModel, TDependenciesModel> Format(string value)
        {
            // Doing the UrlDecode to allow {0} in ActionLink e.g. Html.ActionLink("Index", "Home", new { id = "{0}" })
            Column.Format = HttpUtility.UrlDecode(value);

            return this;
        }
    }
}