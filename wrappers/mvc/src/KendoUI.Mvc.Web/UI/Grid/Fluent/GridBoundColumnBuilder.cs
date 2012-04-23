// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Web;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring bound columns
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class GridBoundColumnBuilder<T> : GridColumnBuilderBase<IGridBoundColumn, GridBoundColumnBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBoundColumnBuilder&lt;T&gt;"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GridBoundColumnBuilder(IGridBoundColumn column)
            : base(column)
        {
        }

        /// <summary>
        /// Gets or sets the format for displaying the data.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Format("{0:dd/MM/yyyy}"))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnBuilder<T> Format(string value)
        {
            // Doing the UrlDecode to allow {0} in ActionLink e.g. Html.ActionLink("Index", "Home", new { id = "{0}" })
            Column.Format = HttpUtility.UrlDecode(value);

            return this;
        }

#if MVC2 || MVC3
        /// <summary>
        /// Provides additional view data in the editor template for that column (if any).
        /// </summary>
        /// <remarks>
        /// The additional view data will be provided if the editing mode is set to in-line or in-cell. Otherwise
        /// use <see cref="GridEditingSettingsBuilder{T}.AdditionalViewData"/> 
        /// </remarks>
        /// <param name="additionalViewData">An anonymous object which contains the additional data</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => {
        ///                 columns.Bound(o => o.Customer).EditorViewData(new { customers = Model.Customers });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public GridBoundColumnBuilder<T> EditorViewData(object additionalViewData)
        {
            Column.AdditionalViewData = additionalViewData;

            return this;
        }

        /// <summary>
        /// Makes the column read-only or not. By default bound columns are not read-only.
        /// </summary>
        /// <remarks>
        /// If a column is read-only it cannot be modified during editing.
        /// </remarks>
        /// <param name="value"><c>true</c> if the column should be read-only;otherwise <c>false</c></param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).ReadOnly(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBoundColumnBuilder<T> ReadOnly(bool value)
        {
            Column.ReadOnly = value;
            return this;
        }

        /// <summary>
        /// Makes the column read-only.
        /// </summary>
        /// <remarks>
        /// If a column is read-only it cannot be modified during editing.
        /// </remarks>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).ReadOnly())
        /// %&gt;
        /// </code>
        /// </example>
        public GridBoundColumnBuilder<T> ReadOnly()
        {
            return ReadOnly(true);
        }

        /// <summary>
        /// Specify which editor template should be used for the column
        /// </summary>
        /// <param name="templateName">name of the editor template</param>
        public GridBoundColumnBuilder<T> EditorTemplateName(string templateName)
        {
            Guard.IsNotNullOrEmpty(templateName, "templateName");

            Column.EditorTemplateName = templateName;
            return this;
        }
#endif
        /// <summary>
        /// Enables or disables sorting the column. All bound columns are sortable by default.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Sortable(false))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnBuilder<T> Sortable(bool value)
        {
            Column.Sortable = value;

            return this;
        }

        /// <summary>
        /// Enables or disables grouping by that column. All bound columns are groupable by default.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Groupable(false))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnBuilder<T> Groupable(bool value)
        {
            Column.Groupable = value;

            return this;
        }

        /// <summary>
        /// Enables or disables filtering the column. All bound columns are filterable by default.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Filterable(false))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnBuilder<T> Filterable(bool value)
        {
            Column.Filterable = value;

            return this;
        }

        /// <summary>
        /// Enables or disables HTML encoding the data of the column. All bound columns are encoded by default.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns => columns.Bound(o => o.OrderDate).Encoded(false))
        /// %&gt;
        /// </code>
        /// </example>        
        public GridBoundColumnBuilder<T> Encoded(bool value)
        {
            Column.Encoded = value;

            return this;
        }

        /// <summary>
        /// Sets the template for the column.
        /// </summary>
        /// <param name="templateAction">The action defining the template.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .Columns(columns => columns
        ///                     .Add(c => c.CustomerID)
        ///                     .Template(() => 
        ///                     { 
        ///                         %&gt;
        ///                          &gt;img 
        ///                             alt="&lt;%= c.CustomerID %&gt;" 
        ///                             src="&lt;%= Url.Content("~/Content/Grid/Customers/" + c.CustomerID + ".jpg") %&gt;" 
        ///                          /&gt;
        ///                         &lt;% 
        ///                     }).Title("Picture");)
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBoundColumnBuilder<T> Template(Action<T> templateAction)
        {
            Guard.IsNotNull(templateAction, "templateAction");

            (Column as GridColumnBase<T>).Template = templateAction;

            return this;
        }

        public GridBoundColumnBuilder<T> Template(Func<T, object> inlineTemplate)
        {
            Guard.IsNotNull(inlineTemplate, "inlineTemplate");

            (Column as GridColumnBase<T>).InlineTemplate = inlineTemplate;

            return this;
        }

        public GridBoundColumnBuilder<T> ClientTemplate(string value)
        {
            Column.ClientTemplate = value;

            return this;
        }

        public GridBoundColumnBuilder<T> ClientGroupHeaderTemplate(string value)
        {
            Column.ClientGroupHeaderTemplate = value;

            return this;
        }        
        
        public GridBoundColumnBuilder<T> ClientGroupFooterTemplate(string value)
        {
            Column.ClientGroupFooterTemplate = value;

            return this;
        }

        public GridBoundColumnBuilder<T> Aggregate(Action<GridAggregatesFactory> aggregates)
        {
            var factory = new GridAggregatesFactory(Column.Aggregates, Column.Member, Column.MemberType);

            aggregates(factory);

            return this;
        }
        /// <summary>
        /// Sets the footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridBoundColumnBuilder<T> FooterTemplate(Action<GridAggregateResult> template)
        {
            Guard.IsNotNull(template, "template");

            Column.FooterTemplate.CodeBlockTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridBoundColumnBuilder<T> FooterTemplate(Func<GridAggregateResult, object> template)
        {
            Guard.IsNotNull(template, "template");

            Column.FooterTemplate.InlineTemplate = template;

            return this;
        }        
        
        /// <summary>
        /// Sets the group footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridBoundColumnBuilder<T> GroupFooterTemplate(Action<GridAggregateResult> template)
        {
            Guard.IsNotNull(template, "template");

            Column.GroupFooterTemplate.CodeBlockTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the group footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridBoundColumnBuilder<T> GroupFooterTemplate(Func<GridAggregateResult, object> template)
        {
            Guard.IsNotNull(template, "template");

            Column.GroupFooterTemplate.InlineTemplate = template;

            return this;
        }        
        
        
        /// <summary>
        /// Sets the group footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridBoundColumnBuilder<T> GroupHeaderTemplate(Action<GridGroupAggregateResult> template)
        {
            Guard.IsNotNull(template, "template");

            Column.GroupHeaderTemplate.CodeBlockTemplate = template;

            return this;
        }

        /// <summary>
        /// Sets the group footer template for the column.
        /// </summary>
        /// <param name="template">The action defining the template.</param>
        public GridBoundColumnBuilder<T> GroupHeaderTemplate(Func<GridGroupAggregateResult, object> template)
        {
            Guard.IsNotNull(template, "template");

            Column.GroupHeaderTemplate.InlineTemplate = template;

            return this;
        }        
    }
}