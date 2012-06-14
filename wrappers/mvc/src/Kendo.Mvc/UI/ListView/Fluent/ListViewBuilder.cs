namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ListView{T}"/>.
    /// </summary>
    public class ListViewBuilder<T> : ViewComponentBuilderBase<ListView<T>, ListViewBuilder<T>>, IHideObjectMembers where T : class
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

        public ListViewBuilder<T> DataSource(Action<AjaxDataSourceBuilder<T>> configurator)
        {
            configurator(new AjaxDataSourceBuilder<T>(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }
    }
}
