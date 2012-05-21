namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    using Extensions;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring columns.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="TColumnBuilder">The type of the column builder.</typeparam>
    public abstract class GridColumnBuilderBase<TColumn, TColumnBuilder> : IHideObjectMembers
        where TColumnBuilder : GridColumnBuilderBase<TColumn, TColumnBuilder>
        where TColumn : IGridColumn
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridColumnBuilderBase&lt;T, TColumnBuilder&gt;"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        protected GridColumnBuilderBase(TColumn column)
        {
            Guard.IsNotNull(column, "column");

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
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Title("ID"))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Title(string text)
        {
            Column.Title = text;

            return this as TColumnBuilder;
        }

        //TODO: Header template builder
/*
        /// <summary>
        /// Sets the HTML attributes applied to the header cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).HeaderHtmlAttributes(new {@class="order-header"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder HeaderHtmlAttributes(object attributes)
        {
            return HeaderHtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the HTML attributes applied to the header cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).HeaderHtmlAttributes(new {@class="order-header"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder HeaderHtmlAttributes(IDictionary<string, object> attributes)
        {
            MergeAttributes(Column.HeaderHtmlAttributes, attributes);

            return this as TColumnBuilder;
        }
        */
        //TODO: Expose footer html attributes
        /*
        /// <summary>
        /// Sets the HTML attributes applied to the footer cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).FooterHtmlAttributes(new {@class="order-footer"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder FooterHtmlAttributes(object attributes)
        {
            return FooterHtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the HTML attributes applied to the footer cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).FooterHtmlAttributes(new {@class="order-footer"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder FooterHtmlAttributes(IDictionary<string, object> attributes)
        {
            MergeAttributes(Column.FooterHtmlAttributes, attributes);

            return this as TColumnBuilder;
        }
        */
        /// <summary>
        /// Sets the HTML attributes applied to the content cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).HtmlAttributes(new {@class="order-cell"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        //TODO: Implement HtmlAttributes
        /*
        /// <summary>
        /// Sets the HTML attributes applied to the content cell of the column.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).HtmlAttributes(new {@class="order-cell"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {
            MergeAttributes(Column.HtmlAttributes, attributes);

            return this as TColumnBuilder;
        }
        */

        /// <summary>
        /// Sets the width of the column in pixels.
        /// </summary>
        /// <param name="pixelWidth">The width in pixels.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Width(100))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Width(int pixelWidth)
        {
            Guard.IsNotNegative(pixelWidth, "pixelWidth");

            Column.Width = pixelWidth + "px";

            return this as TColumnBuilder;
        }

        /// <summary>
        /// Sets the width of the column using CSS syntax.
        /// </summary>
        /// <param name="value">The width to set.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .Columns(columns => columns.Bound(o => 
        ///            {
        ///                %&gt;
        ///                     &lt;%= Html.ActionLink("Edit", "Home", new { id = o.OrderID}) %&gt;
        ///                &lt;%
        ///            })
        ///            .Width("30px")
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Width(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            Column.Width = value;

            return this as TColumnBuilder;
        }
        //TODO: Implement Column visibility
        /*
        /// <summary>
        /// Makes the column visible or not. By default all columns are visible. Invisible columns are not rendered in the output HTML.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Visible((bool)ViewData["visible"]))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Visible(bool value)
        {
            Column.Visible = value;

            return this as TColumnBuilder;
        }
        */
        //TODO: Implement hidden columns
        /*
        /// <summary>
        /// Makes the column hidden or not. By default all columns are not hidden. Hidden columns are rendered in the output HTML but are hidden.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Hidden((bool)ViewData["hidden"]))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Hidden(bool value)
        {
            Column.Hidden = value;

            return this as TColumnBuilder;
        }

        /// <summary>
        /// Hides a column. By default all columns are not hidden. Hidden columns are rendered in the output HTML but are hidden.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).Hidden())
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder Hidden()
        {
            Column.Hidden = true;

            return this as TColumnBuilder;
        }
        */
        //TODO: Implement HeaderContextMenu
        /*
        /// <summary>
        /// Specifys whether the columns should be included in column context menu. By default all columns are included. 
        /// The column also need a Title to be set in order to be include in the context menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderID).IncludeInContextMenu((bool)ViewData["hidden"]))
        /// %&gt;
        /// </code>
        /// </example>
        public TColumnBuilder IncludeInContextMenu(bool value)
        {
            Column.IncludeInContextMenu = value;

            return this as TColumnBuilder;
        }
        */

        //TODO: Implement Header template configuration
        /*
        /// <summary>
        /// Sets the header template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public TColumnBuilder HeaderTemplate(Action template)
        {
            Guard.IsNotNull(template, "template");

            Column.HeaderTemplate.Content = template;
            return this as TColumnBuilder;
        }
        
        /// <summary>
        /// Sets the header template for the column.
        /// </summary>
        /// <param name="template">The string defining the template.</param>
        public TColumnBuilder HeaderTemplate(string template)
        {
            Guard.IsNotNullOrEmpty(template, "template");

            Column.HeaderTemplate.Html = template;
            return this as TColumnBuilder;
        }

        /// <summary>
        /// Sets the header template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public TColumnBuilder HeaderTemplate(Func<object, object> template)
        {
            Guard.IsNotNull(template, "template");

            Column.HeaderTemplate.InlineTemplate = template;
            return this as TColumnBuilder;
        }
        */

        /// <summary>
        /// Sets the footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public TColumnBuilder FooterTemplate(Action template)
        {
            Guard.IsNotNull(template, "template");

            Column.FooterTemplate.CodeBlockTemplate = delegate { template(); };
            return this as TColumnBuilder;
        }

        /// <summary>
        /// Sets the footer template for the column.
        /// </summary>
        /// <param name="template">The string defining the template.</param>
        public TColumnBuilder FooterTemplate(string template)
        {
            Guard.IsNotNullOrEmpty(template, "template");

            Column.FooterTemplate.Html = template;
            return this as TColumnBuilder;
        }

        /// <summary>
        /// Sets the footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public TColumnBuilder FooterTemplate(Func<object, object> template)
        {
            Guard.IsNotNull(template, "template");

            Column.FooterTemplate.InlineTemplate = (result) => template(result);

            return this as TColumnBuilder;
        }

        public TColumnBuilder ClientFooterTemplate(string template)
        {
            Guard.IsNotNullOrEmpty(template, "template");

            Column.ClientFooterTemplate = template;
            
            return this as TColumnBuilder;
        }

        private static void MergeAttributes(IDictionary<string, object> target, IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            target.Merge(attributes);
        }
    }
}
