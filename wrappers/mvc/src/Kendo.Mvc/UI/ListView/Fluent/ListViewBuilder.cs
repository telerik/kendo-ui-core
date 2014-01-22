namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ListView{T}"/>.
    /// </summary>
    public class ListViewBuilder<T> : WidgetBuilderBase<ListView<T>, ListViewBuilder<T>>, IHideObjectMembers where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ListView{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ListViewBuilder(ListView<T> component)
            : base(component)
        {
        }

        /// <summary>
        /// Binds the ListView to a list of objects
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView&lt;Order&gt;()
        ///             .Name("Orders")        
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Binds the ListView to a list of objects
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView&lt;Order&gt;()
        ///             .Name("Orders")        
        ///             .BindTo((IEnumerable)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> BindTo(IEnumerable dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Specifies ListView item template.
        /// </summary>      
        /// <param name="templateId">The Id of the element which contains the template.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView&lt;Order&gt;()
        ///             .Name("Orders")        
        ///             .ClientTemplateId("listViewTemplate");
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> ClientTemplateId(string templateId)
        {
            Component.ClientTemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Allows paging of the data.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .Ajax(ajax => ajax.Action("Orders", "ListView"))        
        ///             .Pageable();
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Pageable()
        {
            return Pageable(delegate { });
        }

        /// <summary>
        /// Allows paging of the data.
        /// </summary>
        /// <param name="pagerAction">Use builder to define paging settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("Orders", "ListView"))        
        ///             .Pageable(paging => paging.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Pageable(Action<PageableBuilder> pagerAction)
        {
            Component.Pageable.Enabled = true;

            pagerAction(new PageableBuilder(Component.Pageable));

            return this;
        }

        /// <summary>
        /// Enables keyboard navigation.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .Ajax(ajax => ajax.Action("Orders", "ListView"))        
        ///             .Navigatable();
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Navigatable()
        {
            Component.Navigatable = true;

            return this;
        }

        /// <summary>
        /// Enables single item selection.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .Selectable()
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Selectable()
        {
            Component.Selectable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Enables item selection.
        /// </summary>
        /// <param name="selectionAction">Use builder to define the selection mode.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .Selectable(selection => {
        ///                 selection.Enabled(true);
        ///                 selection.Mode(ListViewSelectionMode.Multiple);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Selectable(Action<ListViewSelectionSettingsBuilder> selectionAction)
        {

            Selectable();

            selectionAction(new ListViewSelectionSettingsBuilder(Component.Selectable));

            return this;
        }

        /// <summary>
        /// Specifies if the ListView should be automatically bound on initial load. 
        /// This is only possible if AJAX binding is used, and widget is not initialy populated on the server.
        /// </summary>
        /// <param name="value">If true ListView will be automatically data bound, otherwise false</param>        
        public ListViewBuilder<T> AutoBind(bool value)
        {
            Component.AutoBind = value;
            return this;
        }

        /// <summary>
        /// Specifies ListView wrapper element tag name.
        /// </summary>       
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .TagName("div")
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> TagName(string tagName)
        {
            Component.TagName = tagName;

            return this;
        }

        /// <summary>
        /// Configures the ListView editing settings.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .Editable(settings => settings.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Editable(Action<ListViewEditingSettingsBuilder<T>> configurator)
        {
            configurator(new ListViewEditingSettingsBuilder<T>(Component.Editable));

            return this;
        }

        /// <summary>
        /// Enables ListView editing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .Editable()
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Editable()
        {
            return Editable(settings => settings.Enabled(true) );
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView()
        ///             .Name("ListView")
        ///             .Events(events => events
        ///                 .DataBound("onDataBound")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ListViewBuilder<T> Events(Action<ListViewEventBuilder> configurator)
        {

            configurator(new ListViewEventBuilder(Component.Events));

            return this;
        }

        public ListViewBuilder<T> DataSource(Action<ListViewAjaxDataSourceBuilder<T>> configurator)
        {
            configurator(new ListViewAjaxDataSourceBuilder<T>(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }
    }
}
