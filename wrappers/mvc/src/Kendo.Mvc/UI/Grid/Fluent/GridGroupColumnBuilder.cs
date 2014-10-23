namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    using Extensions;

    public class GridColumnGroupBuilder<T> 
        where T : class 
    {
        private IUrlGenerator urlGenerator;
        private ViewContext viewContext;

        /// <summary>
        /// Gets or sets the column.
        /// </summary>
        /// <value>The column.</value>
        public IGridColumnGroup Column
        {
            get;
            private set;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="GridColumnGroupBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public GridColumnGroupBuilder(IGridColumnGroup column, Grid<T> container, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            Column = column;
            Container = container;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        public Grid<T> Container
        {
            get;
            private set;
        }

        // <summary>
        /// Sets the title displayed in the header of the column.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Title("ID"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> Title(string text)
        {
            Column.Title = text;

            return this as GridColumnGroupBuilder<T>;
        }

        /// <summary>
        /// Sets the HTML attributes applied to the header cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).HeaderHtmlAttributes(new {@class="order-header"}))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> HeaderHtmlAttributes(object attributes)
        {
            return HeaderHtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes applied to the header cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).HeaderHtmlAttributes(new {@class="order-header"}))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> HeaderHtmlAttributes(IDictionary<string, object> attributes)
        {
            MergeAttributes(Column.HeaderHtmlAttributes, attributes);

            return this as GridColumnGroupBuilder<T>;
        }
        /// <summary>
        /// Makes the column visible or not. By default all columns are visible. Invisible columns are not rendered in the output HTML.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Visible((bool)ViewData["visible"]))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> Visible(bool value)
        {
            Column.Visible = value;

            return this as GridColumnGroupBuilder<T>;
        }

        /// <summary>
        /// Makes the column static. By default all columns are not locked.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Locked())
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> Locked()
        {
            return Locked(true);
        }

        /// <summary>
        /// Makes the column static or not. By default all columns are not locked.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Locked((bool)ViewData["locked"]))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> Locked(bool value)
        {
            Column.Locked = value;

            return this as GridColumnGroupBuilder<T>;
        }

        /// <summary>
        /// If set to false the column will remain in the side of the grid into which its own locked configuration placed it.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Lockable((bool)ViewData["lockable"]))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> Lockable(bool value)
        {
            Column.Lockable = value;

            return this as GridColumnGroupBuilder<T>;
        }

        /// <summary>
        /// Makes the column hidden or not. By default all columns are not hidden. Hidden columns are rendered in the output HTML but are hidden.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Hidden((bool)ViewData["hidden"]))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> Hidden(bool value)
        {
            Column.Hidden = value;

            return this as GridColumnGroupBuilder<T>;
        }

        /// <summary>
        /// Hides a column. By default all columns are not hidden. Hidden columns are rendered in the output HTML but are hidden.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Hidden())
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnGroupBuilder<T> Hidden()
        {
            Column.Hidden = true;

            return this as GridColumnGroupBuilder<T>;
        }

        public GridColumnGroupBuilder<T> Columns(Action<GridColumnFactory<T>> configurator)
        {
            GridColumnFactory<T> factory = new GridColumnFactory<T>(Container, viewContext, urlGenerator, (GridColumnGroup<T>)Column);

            configurator(factory);

            return this;
        }

        /// <summary>
        /// Sets the header template for the column. If sorting is enabled, the template content wrapper must have a k-link CSS class.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridColumnGroupBuilder<T> HeaderTemplate(Action template)
        {
            Column.HeaderTemplate.Content = template;
            return this as GridColumnGroupBuilder<T>;
        }

        /// <summary>
        /// Sets the header template for the column.  If sorting is enabled, the template content wrapper must have a k-link CSS class.
        /// </summary>
        /// <param name="template">The string defining the template.</param>
        public GridColumnGroupBuilder<T> HeaderTemplate(string template)
        {
            Column.HeaderTemplate.Html = template;
            return this as GridColumnGroupBuilder<T>;
        }

        /// <summary>
        /// Sets the header template for the column.  If sorting is enabled, the template content wrapper must have a k-link CSS class.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridColumnGroupBuilder<T> HeaderTemplate(Func<object, object> template)
        {
            Column.HeaderTemplate.InlineTemplate = template;
            return this as GridColumnGroupBuilder<T>;
        }

        private static void MergeAttributes(IDictionary<string, object> target, IDictionary<string, object> attributes)
        {
            target.Merge(attributes);
        }
    }
}
