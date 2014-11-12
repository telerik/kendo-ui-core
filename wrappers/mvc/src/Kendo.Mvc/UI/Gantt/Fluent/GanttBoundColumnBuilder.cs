namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring bound columns
    /// </summary>
    /// <typeparam name="TTaskModel">The type of the task data item</typeparam>
    /// /// <typeparam name="TDependenciesModel">The type of the dependency data item</typeparam>
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
    }
}