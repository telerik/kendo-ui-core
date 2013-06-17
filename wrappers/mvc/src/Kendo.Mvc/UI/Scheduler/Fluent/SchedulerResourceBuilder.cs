namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerResource"/>.
    /// </summary>
    public class SchedulerResourceBuilder<TModel>
        where TModel : class, ISchedulerEvent
    {

        private readonly SchedulerResource<TModel> resource;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerResourceBuilder"/> class.
        /// </summary>
        /// <param name="resource">The resource.</param>
        /// 
        public SchedulerResourceBuilder(SchedulerResource<TModel> resource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.resource = resource;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        /// <summary>
        /// Sets the title option.
        /// </summary>
        /// <param name="title">The title.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> Title(string title)
        {
            resource.Title = title;

            return this;
        }

        /// <summary>
        /// Sets the multiple option.
        /// </summary>
        /// <param name="multiple">The multiple.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> Multiple(bool multiple)
        {
            resource.Multiple = multiple;

            return this;
        }

        /// <summary>
        /// Binds the scheduler resource to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="ASPX">
        /// //TODO: Code example
        /// </code>
        /// <code lang="Razor">
        /// //TODO: Code example
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> BindTo(IEnumerable dataSource)
        {
            resource.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Defines the scheduler resource dataValueField
        /// </summary>
        /// <param name="field">The data source.</param>
        /// <example>
        /// <code lang="ASPX">
        /// //TODO: Code example
        /// </code>
        /// <code lang="Razor">
        /// //TODO: Code example
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> DataValueField(string field)
        {
            resource.DataValueField = field;

            return this;
        }


        /// <summary>
        /// Defines the scheduler resource dataTextField
        /// </summary>
        /// <param name="field">The data source.</param>
        /// <example>
        /// <code lang="ASPX">
        /// //TODO: Code example
        /// </code>
        /// <code lang="Razor">
        /// //TODO: Code example
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> DataTextField(string field)
        {
            resource.DataTextField = field;

            return this;
        }

        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(resource.DataSource, this.viewContext, this.urlGenerator));

            return this;
        }

    }
}
