namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the Gantt <see cref="DataSource"/>.
    /// </summary>
    public class DiagramConnectionDataSourceBuilder<TModel> : FilterableAjaxDataSourceBuilder<TModel, DiagramConnectionDataSourceBuilder<TModel>>
         where TModel : class
    {
        public DiagramConnectionDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public DiagramConnectionDataSourceBuilder<TModel> Model(Action<DiagramConnectionModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DiagramConnectionModelDescriptorFactory<TModel>((DiagramConnectionModelDescriptor)dataSource.Schema.Model));

            return this;
        }
    }
}
