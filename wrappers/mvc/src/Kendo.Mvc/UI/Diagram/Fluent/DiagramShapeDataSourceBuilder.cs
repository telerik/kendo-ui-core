namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the Gantt <see cref="DataSource"/>.
    /// </summary>
    public class DiagramShapeDataSourceBuilder<TModel> : AjaxDataSourceBuilder<TModel>
         where TModel : class
    {
        public DiagramShapeDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public DiagramShapeDataSourceBuilder<TModel> Model(Action<DiagramShapeModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DiagramShapeModelDescriptorFactory<TModel>((DiagramShapeModelDescriptor)dataSource.Schema.Model));

            return this;
        }
    }
}
