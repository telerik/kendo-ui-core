namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    using Extensions;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring columns.
    /// </summary>
    /// <typeparam name="TColumn"></typeparam>
    /// <typeparam name="TColumnBuilder">The type of the column builder.</typeparam>
    public abstract class GanttColumnBuilderBase<TColumn, TColumnBuilder> : IHideObjectMembers
        where TColumnBuilder : GanttColumnBuilderBase<TColumn, TColumnBuilder>
        where TColumn : IGanttColumn
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GanttColumnBuilderBase&lt;T, TColumnBuilder&gt;"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        protected GanttColumnBuilderBase(TColumn column)
        {
            Column = column;
        }

        /// <summary>
        /// Gets or sets the column.
        /// </summary>
        /// <value>The column.</value>
        public TColumn Column
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the title displayed in the header of the column.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Gantt(Model)
        ///             .Name("Gantt")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Title("ID"))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Title(string text)
        {
            Column.Title = text;

            return this as TColumnBuilder;
        }

        /// <summary>
        /// Makes the column editable or not.By default a column is not editable.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Gantt(Model)
        ///             .Name("Gantt")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Editable(true))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Editable(bool value)
        {
            Column.Editable = value;

            return this as TColumnBuilder;
        }

        /// <summary>
        /// Makes the column sortable or not. By default a column is not sortable.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Gantt(Model)
        ///             .Name("Gantt")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Sortable(true))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Sortable(bool value)
        {
            Column.Sortable = value;

            return this as TColumnBuilder;
        }

        /// <summary>
        /// Sets the width of the column in pixels.
        /// </summary>
        /// <param name="pixelWidth">The width in pixels.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Gantt(Model)
        ///             .Name("Gantt")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Width(100))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Width(int pixelWidth)
        {
            Column.Width = pixelWidth;

            return this as TColumnBuilder;
        }

        private static void MergeAttributes(IDictionary<string, object> target, IDictionary<string, object> attributes)
        {
            target.Merge(attributes);
        }
    }
}
